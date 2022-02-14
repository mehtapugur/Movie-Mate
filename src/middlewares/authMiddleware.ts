/**
 * Imports
 */
import { RequestHandler } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const auth: RequestHandler = (req, res, next) => {
  //get token from cookie
  globalThis.token = req.cookies.jwt;
  //verify token
  if (globalThis.token) {
    jwt.verify(
      globalThis.token,
      process.env.JWT_SECRET,
      (err: VerifyErrors) => {
        next();
      }
    );
  } else {
    res.redirect("/login");
  }
};

//if the user is logged in they are not redirected to the login page
export const isLogged: RequestHandler = (req, res, next) => {
  try {
    if (req.session.userID) {
      return res.redirect("/users/dashboard");
    }
    next();
  } catch (Error) {
    throw new Error();
  }
};
