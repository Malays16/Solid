import { Request, Response } from 'express';

const error404 = (req: Request, res: Response, next: Function) => {
  res.status(404);
  res.json('404 | not found');
};

export default error404;
