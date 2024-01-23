import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import helloWorldService from '../services/user.service';

const greeting = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await helloWorldService.getGreeting();

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
    const result = await helloWorldService.addUser(_req.body);

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result,
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  greeting, addUser
};