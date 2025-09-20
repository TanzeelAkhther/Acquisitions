import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-please-change-in-production'; // Use a strong secret key in production

const JWT_EXPIRES_IN = '1d'; // Token expiration time

export const jwttoken = {
  sign: (payload) => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch(e) {
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }    
  },
  verify: (token) => {
    try{
      return jwt.verify(token, JWT_SECRET);
    }catch(e){
      logger.error('Failed to authenticate token', e);
      throw new Error('Failed to authenticate token');
    }
        
  }
    
};