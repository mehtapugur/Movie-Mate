import { RequestHandler } from "express";
//import User from "../models/User";
import { getManager } from "typeorm";
//import { User } from "../entity/user.entity";
import jwt, { VerifyErrors } from "jsonwebtoken";

export const auth: RequestHandler = (req, res, next) => {
  //get token from cookie
  const token = req.cookies.jwt;
  req.session.browserInfo = req.headers["user-agent"]; //browser information

  //verify token
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err: VerifyErrors, decoded: any) => {
        console.log("ulasti");
        if (err) return next();
        //compare browser information
        if (decoded.browserInfo === req.headers["user-agent"]) {
          console.log(decoded);
          console.log(req.session);
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};

// //check current user
// export const userControl: RequestHandler = (req, res, next) => {
//   //create token from cookie
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(
//       token,
//       process.env.JWT_KEY,
//       async (err: VerifyErrors, decoded: any) => {
//         if (err) {
//           console.log(err.message);
//           next();
//         } else {
//           console.log(decoded);
//           next();
//         }
//       }
//     );
//   } else {
//     next();
//   }
// };
