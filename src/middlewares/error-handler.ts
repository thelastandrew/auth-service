import { NextFunction, Request, Response } from 'express';

export type ApiError = { status?: number } & Error;

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message } = err;
  console.log(err);
  if (status) {
    return res.status(status).json({ message });
  }

  return res.status(500).json({ message: 'Unexpected' });
};
