import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { Data } from "../entity/data.entity";
import { getManager } from "typeorm";
import { RequestHandler } from "express";
import session from "express-session";

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
        req.session.userID = user.id; //?
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
  console.log(req.session.userID);
  const repository = getManager().getRepository(User);
  const users = await repository.find();
  res.status(200).render("dashboard", {
    users,
  });
};

export const getAddMoviePage: RequestHandler = async (req, res) => {
  //const users = await User.find();
  //const repository = getManager().getRepository(User);
  //const users = await repository.find();
  res.status(200).render("add_movie");
};

export const getAddActorPage: RequestHandler = async (req, res) => {
  //const users = await User.find();
  //const repository = getManager().getRepository(User);
  //const users = await repository.find();
  res.status(200).render("add_actor");
};

export const createData: RequestHandler = async (req, res) => {
  const { name, description } = await req.body;
  //const data = await Data.create(req.body);
  const repository = await getManager().getRepository(Data);
  const data = await repository.save({
    name: name,
    description: description,
  });
  const datas = await repository.find();
  try {
    // res.status(201).json({
    //   status: "success",
    //   data,
    // });
    res.status(200).render("datas", {
      datas,
      //page_name: "datas",
    });
    //res.status(201).redirect("/users/datas");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const createMovie: RequestHandler = async (req, res) => {
  const { name, description } = await req.body;
  const repository = await getManager().getRepository(Data);
  const movie = await repository.save({
    name: name,
    description: description,
    type: "movie",
    user_id: globalThis.userIN,
  });
  const movies = await repository.find({
    where: { user_id: globalThis.userIN, type: "movie" },
  });
  try {
    res.status(200).render("movies", {
      movies,
      //page_name: "datas",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const createActor: RequestHandler = async (req, res) => {
  const { name, description } = await req.body;
  const repository = await getManager().getRepository(Data);
  const actor = await repository.save({
    name: name,
    description: description,
    type: "actor",
    user_id: globalThis.userIN,
  });
  const actors = await repository.find({
    where: { user_id: globalThis.userIN, type: "actor" },
  });
  try {
    res.status(200).render("actors", {
      actors,
      //page_name: "datas",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const getAllMovies: RequestHandler = async (req, res) => {
  try {
    console.log("hii1");
    const repository = getManager().getRepository(Data);
    // const datas = await repository.find({
    //   id: globalThis.userIN
    // });
    console.log("hii2");
    const movies = await repository.find({
      //where: { id: globalThis.userIN, type: "data" }
      where: { user_id: globalThis.userIN, type: "movie" },
    });
    console.log(movies);
    console.log("hii3");
    //   id: globalThis.userIN
    // });
    //console.log(datas[0].type); calismiyo

    res.status(200).render("movies", {
      movies,
      //page_name: "datas",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const getAllActors: RequestHandler = async (req, res) => {
  try {
    const repository = getManager().getRepository(Data);
    // const datas = await repository.find({
    //   id: globalThis.userIN
    // });
    const actors = await repository.find({
      //where: { id: globalThis.userIN, type: "data" }
      where: { user_id: globalThis.userIN, type: "actor" },
    });
    console.log(actors);
    //   id: globalThis.userIN
    // });
    //console.log(datas[0].type); calismiyo

    res.status(200).render("actors", {
      actors,
      //page_name: "datas",
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const deleteData: RequestHandler = async (req, res) => {
  try {
    // const repository = getManager().getRepository(Data);
    // const datas = await repository.find();

    // res.status(200).render("datas", {
    //   datas,
    //   //page_name: "datas",
    // });
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);
    console.log(req.params.id);
    await repository.delete(data);
    console.log("sildimi");
    res.redirect("/users/" + `${data.type}` + "s");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const getData: RequestHandler = async (req, res) => {
  try {
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);
    res.render("data", {
      data,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const updateData: RequestHandler = async (req, res) => {
  //const { name, description } = await req.body;
  console.log("updategeldi");
  try {
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);

    data.name = req.body.name;
    data.description = req.body.description;
    console.log(req.body.name, req.body.description);
    await repository.save(data);
    // res.render("data", {
    //   data,
    // });

    //res.redirect("/users/movies");
    //console.log(`${data.type}`);
    res.redirect("/users/" + `${data.type}` + "s");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

export const getEditPage: RequestHandler = async (req, res) => {
  const repository = getManager().getRepository(Data);
  const data = await repository.findOne(req.params.id);
  res.status(200).render("edit", {
    data,
  });
};
