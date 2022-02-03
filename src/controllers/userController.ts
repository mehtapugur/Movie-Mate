import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { getManager } from "typeorm";
import { RequestHandler } from "express";

const createToken = (id: string, browserInfo: string): string =>
  jwt.sign({ id, browserInfo }, process.env.JWT_SECRET, {
    expiresIn: "60m", //minutes, session time
  });

export const createUser: RequestHandler = async (req, res) => {
  const { name, surname, email, password } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    const repository = getManager().getRepository(User);
    //create new user
    const user = await repository.save({
      name,
      surname,
      email,
      password: await bcrypt.hash(password, 8),
    });

    //create token
    const token = createToken(user.id, browserInfo);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 600000 });
    if (user) res.status(201).redirect("/login");
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  //take user information from form
  const { email, password } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    //find user in database
    //const user = await User.findOne({ username });
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ email });

    //decrypt encrypted password and compare with entered password
    bcrypt.compare(password, user.password, (err, same) => {
      if (same) {
        //create a token with JWT
        const token = createToken(user.id, browserInfo);

        //send this token to cookie
        res.cookie("jwt", token, { httpOnly: true, maxAge: 600000 });
        //res.status(200).json({ user: user._id }); //?
        res.status(200).redirect("/users/dashboard");
      } else {
        res.redirect(301, "login");
      }
    });
  } catch (err) {
    res.status(400).json({ errors: err });
    res.redirect("/");
  }
};

//get home page where users are listed
export const getDashboardPage: RequestHandler = async (req, res) => {
  //const users = await User.find();
  const repository = getManager().getRepository(User);
  const users = await repository.find();
  res.status(200).render("dashboard", {
    users,
  });
};
