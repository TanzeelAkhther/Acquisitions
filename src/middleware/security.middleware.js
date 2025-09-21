import aj from '#config/arcjet.js';
import logger from '#config/logger.js';
import { slidingWindow } from '@arcjet/node';

const securityMiddleware = async (req, res, next) => {
  try {
    // For now, we'll use IP-based rate limiting since req.user might not be available
    // You can modify this later when you have authentication middleware
    const role = req.user?.role || 'guest';

    let limit;

    switch (role) {
      case 'admin':
        limit = 20;
        break;
      case 'user':
        limit = 10;
        break;
      case 'guest':
        limit = 5;
        break;
      default:
        limit = 5; // Default to guest limit
        break;
    }

    const client = aj.withRule(
      slidingWindow({
        mode: 'LIVE',
        interval: '1m',
        max: limit,
        name: `${role}-rate-limit`,
      })
    );

    const decision = await client.protect(req);

    if (decision.isDenied() && decision.reason.isBot()) {
      logger.warn('Bot request blocked', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      return res
        .status(403)
        .json({
          error: 'Forbidden',
          message: 'Automated requests are not allowed',
        });
    }

    if (decision.isDenied() && decision.reason.isShield()) {
      logger.warn('Shield Blocked request', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
        method: req.method,
      });

      return res
        .status(403)
        .json({
          error: 'Forbidden',
          message: 'Request blocked by security policy',
        });
    }

    if (decision.isDenied() && decision.reason.isRateLimit()) {
      logger.warn('Rate limit exceeded', {
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        path: req.path,
      });

      // Standard rate limiting response: 429 Too Many Requests
      // Retry-After is set to 60 seconds to match the 1 minute window
      res.set('Retry-After', '60');
      return res
        .status(429)
        .json({ error: 'Too Many Requests', message: 'Too many requests' });
    }

    next();
  } catch (e) {
    console.error('Arcjet middleware error:', e);
    res
      .status(500)
      .json({
        error: 'Internal server error',
        message: 'Something went wrong with security middleware',
      });
  }
};
export default securityMiddleware;