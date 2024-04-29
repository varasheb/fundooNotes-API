import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//create new user
export const newUser = async (body) => {

  body.password=await bcrypt.hash(body.password,10)

  const userExists= await User.findOne({email:body.email})
  
  if(userExists){
   throw new Error('User with this email already exists')
  }else{
  const data = await User.create(body);
  return data;
  }
};

export const userLogin=async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

  return {user,token}
};

