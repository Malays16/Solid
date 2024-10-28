import { Request, Response } from 'express';

const error400 = (req: Request, res: Response, next: Function) => {
  res.status(400);
  res.json('400 | Bad Request');
};

export default error400;
