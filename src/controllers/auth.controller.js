import logger from '#config/logger.js';
import { formatValidationError } from '#utils/format.js';
import { signupSchema } from '#validations/auth.validations.js';
import { cookies } from '#utils/cookies.js';
import { jwttoken } from '#utils/jwt.js';
import { createUser } from '#services/auth.service.js';

export const signup = async (req, res, next) => {
  try {
    const ValidationResult = signupSchema.safeParse(req.body);

    if(!ValidationResult.success) {
      return res.status(400).json({ 
        errors: 'Validation Failed',
        details: formatValidationError(ValidationResult.error)
      });
    }
    const { name, email, password, role} = ValidationResult.data;

    //AUTH Service
    const user = await createUser({name, email, password, role});
    
    const token =jwttoken.sign({id: user.id, email: user.email, role: user.role});

    cookies.set(res, 'token', token);

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({
      message: 'User registered',
      user: {
        id: user.id, name: user.name, email: user.email, role: user.role
      }
    });

  } catch (e) {
    logger.error('Signup error', e);

    if(e.message === 'User with this email already exists') {
      return res.status(409).json({ error: 'Email already exists'});
    }
    next(e);  // Pass the error to the next middleware
  }
};