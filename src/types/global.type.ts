import { NextFunction, Request, Response } from "express";

type middleware = (req: Request, res: Response, next: NextFunction) => void;

const login: middleware = (req, res, next) => {};

declare global {
  var userIN: any;
}

declare global {
  var token: string;
}
