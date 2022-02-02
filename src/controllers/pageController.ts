import { RequestHandler } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";

export const getIndexPage: RequestHandler = async (req, res) => {
  // try {
  //   //Before redirecting index page to get related navigators check whether the user is logged in
  //   if (req.session.userID) {
  //     const user = await getRepository(User).findOne({
  //       id: req.session.userID,
  //     });
  //     res.status(200).render("index", {
  //       user,
  //     });
  //   } else {
  //     const user = null;
  //     res.status(200).render("index", {
  //       user,
  //     });
  //   }
  // } catch (Error) {
  //   throw new Error();
  // }
  res.status(200).render("index");
};

export const getRegisterPage: RequestHandler = async (req, res) => {
  try {
    res.status(200).render("signup", { errors });
  } catch (Error) {
    throw new Error();
  }
};

export const getLoginPage: RequestHandler = async (req, res) => {
  try {
    res.status(200).render("login", { errors });
  } catch (Error) {
    throw new Error();
  }
};

let errors: Array<String> = [];
