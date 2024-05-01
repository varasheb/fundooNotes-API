import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const key = process.env.JWT_SECRET_KEY;



export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.headers.authorization;
    if (!bearerToken) {
      throw new Error('Token Not provided');
    }
    bearerToken=bearerToken.split(' ')[1]
    const {userId}= await jwt.verify(bearerToken, key);
    res.locals.userId = userId;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};

