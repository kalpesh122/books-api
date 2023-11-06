import { Request, Response, NextFunction } from 'express';

function trimRequestBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { method, body } = req;

  if (method === 'POST' || method === 'PATCH') {
    if (typeof body === 'object' && body !== null) {
      for (const key in body) {
        if (typeof body[key] === 'string') {
          body[key] = body[key].trim();
        }
      }
    }
  }

  next();
}

export default trimRequestBody;
