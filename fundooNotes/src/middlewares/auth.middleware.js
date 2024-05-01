import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const key = process.env.JWT_SECRET_KEY;

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization.split(' ')[1];
    if (!bearerToken) {
      throw new Error('Token Not provided');
    }
    const {userId}= await jwt.verify(bearerToken, key);
    res.locals.userId = userId;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

