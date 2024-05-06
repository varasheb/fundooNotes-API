import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendmail from '../utils/sendEmail'
dotenv.config();
const key = process.env.JWT_SECRET_KEY;
const resetkey=process.env.SECRET_KEY;


export const signInUser = async (body) => {
  const userExists = await User.findOne({ email: body.email });
  if (userExists) {
    throw new Error('User with this email already exists');
  } else {
    body.password = await bcrypt.hash(body.password, 10);
    const data = await User.create(body);
    return data;
  }
};



export const userLogin = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
  return { user, token };
};


export const forgetPassword= async ({email}) => {
  
    const user = await User.findOne({email});
    if(!user)
    throw new Error("This email is does not Exits")
    const token = jwt.sign({ userId: user._id }, resetkey, { expiresIn: '10m' });
    const result= await sendmail(user.email,token)
    return { user ,token ,result };
};

export const resetPassword= async (userId,newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.password= await bcrypt.hash(newPassword, 10);
    await user.save();
    return user;
};