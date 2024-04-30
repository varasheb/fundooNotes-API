import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';


export const signInUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().min(4).required(),
    lastName: Joi.string().min(4).required(),
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
    .message('Password must be 8 characters or more with at least one digit, one lowercase letter, one uppercase letter, and one special character')
    .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next()
  }
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().message('Not a valid Email').required(),
    password: Joi.string().min(8).pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).{8,}$/)
    .message('Password must be 8 characters or more with at least one digit, one lowercase letter, one uppercase letter, and one special character')
    .required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  } else {
    req.validatedBody = value;
    next()
  }
};

