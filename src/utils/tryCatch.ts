import { NextFunction, Request, Response } from 'express';

type ControllerType = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export const tryCatch =
  (controller: ControllerType) =>
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
