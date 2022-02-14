/**
 * Imports
 */
import { RequestHandler } from "express";

export const getIndexPage: RequestHandler = async (req, res) => {
  res.status(200).render("index");
};

export const getRegisterPage: RequestHandler = async (req, res) => {
  try {
    res.status(200).render("signup");
  } catch (Error) {
    throw new Error();
  }
};

export const getLoginPage: RequestHandler = async (req, res) => {
  try {
    res.status(200).render("login", {});
  } catch (Error) {
    throw new Error();
  }
};
