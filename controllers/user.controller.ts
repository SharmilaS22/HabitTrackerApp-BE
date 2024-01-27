import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import userService from '../services/user.service';

const greeting = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.getGreeting();

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

const addUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { success, data } = await userService.addUser(_req.body);

    if (success) {
      return res.status(httpStatus.CREATED).json({
        success: true,
        status: httpStatus.OK,
        data: data,
      });
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        status: httpStatus.BAD_REQUEST,
        message: 'Bad Request',
      });
    }
    
  } catch (err) {
    return next(err);
  }
};

const getUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userid = _req.params.userid;
    const result = await userService.getUser(userid);

    if (result) {
      return res.status(httpStatus.OK).json({
        success: true,
        status: httpStatus.OK,
        data: result,
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      status: httpStatus.NOT_FOUND,
      message: 'User not found',
    });

  } catch (err) {
    return next(err);
  }
}

const updateUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userid = _req.params.userid;
    const { success } = await userService.updateUser(userid, _req.body);
    if (success) {
      return res.status(httpStatus.NO_CONTENT).json({
        success: true,
        status: httpStatus.NO_CONTENT,
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      status: httpStatus.NOT_FOUND,
      message: 'User not found',
    });
  } catch (err) {
    return next(err);
  }
}

const deleteUser = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const userid = _req.params.userid;
    const { success } = await userService.deleteUser(userid);

    if (success) {
      return res.status(httpStatus.NO_CONTENT).json({
        success: true,
        status: httpStatus.NO_CONTENT,
      });
    }
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      status: httpStatus.NOT_FOUND,
      message: 'User not found',
    });
  } catch (err) {
    return next(err);
  }
}

export default {
  greeting,
  addUser,
  getUser,
  updateUser,
  deleteUser
};