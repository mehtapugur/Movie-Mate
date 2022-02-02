import { NextFunction, Request, Response } from "express";

type middleware = (req: Request, res: Response, next: NextFunction) => void;

const login: middleware = (req, res, next) => {};
