import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';


export const signInUser = async (req, res) => {
  try {
    const body=req.body
    const data = await UserService.signInUser(body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
};

export const userLogin= async (req, res) => {
  try {
    const data = await UserService.userLogin(req.body);
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User loggedIn successfully',
      data: data.user,
      token: data.token
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
  
}

export const forgetPassword= async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Mail sent  Sucefully',
      user: data.user,
      token: data.token,
      result:data.result.messageId
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}

export const resetPassword= async (req, res) => {
  try {
    const {userId} = res.locals;
    const {password}=req.body;
    const data = await UserService.resetPassword(userId,password);

    res.status(HttpStatus.OK).json({
      success: true,
      message: 'Reset password Sucefully',
      data: data,
    });

  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: error.message
    });
  }
}