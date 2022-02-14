/**
 * Imports
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../entity/user.entity";
import { Data } from "../entity/data.entity";
import { Shared } from "../entity/shared.entity";
import { Likes } from "../entity/likes.entity";
import { Comments } from "../entity/comments.entity";
import { getManager, getConnection } from "typeorm";
import { RequestHandler } from "express";

//create token
const createToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60m", //minutes, session time
  });

//create user
export const createUser: RequestHandler = async (req, res) => {
  //get informations from body
  const { name, surname, email, password } = req.body;
  //const browserInfo = req.headers["user-agent"];

  try {
    const repository = getManager().getRepository(User);
    //create new user and save
    const user = await repository.save({
      name,
      surname,
      email,
      password: await bcrypt.hash(password, 8),
    });

    //create token for user and save it as global
    globalThis.token = createToken(user.id);

    //save jwt in cookie
    res.cookie("jwt", globalThis.token, { httpOnly: true, maxAge: 600000 });
    if (user) res.status(201).redirect("/login");
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

//login user
export const loginUser: RequestHandler = async (req, res) => {
  //take user information from form
  const { email, password } = req.body;
  //const browserInfo = req.headers["user-agent"];

  try {
    //find user in database
    const repository = getManager().getRepository(User);
    const user = await repository.findOne({ email });

    //decrypt encrypted password and compare with entered password
    bcrypt.compare(password, user.password, (err, same) => {
      if (same) {
        //create a token with JWT
        globalThis.token = createToken(user.id);
        req.session.userID = user.id; //?
        //send this token to cookie
        res.cookie("jwt", globalThis.token, { httpOnly: true, maxAge: 600000 });

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
  //get shared datas
  const repository = getManager().getRepository(Shared);
  const shared = await repository.find({
    order: { sharedAt: "ASC" },
  });

  //get likes
  const likedRepository = getManager().getRepository(Likes);
  const userLiked = await likedRepository.find({
    where: { user_id: userIN },
  });

  //get users
  const userRepository = getManager().getRepository(User);
  const users = await userRepository.find();

  res.status(200).render("dashboard", {
    shared,
    users,
  });
};

export const getAddMoviePage: RequestHandler = async (req, res) => {
  res.status(200).render("add_movie");
};

export const getAddActorPage: RequestHandler = async (req, res) => {
  res.status(200).render("add_actor");
};

//create data
export const createData: RequestHandler = async (req, res) => {
  //get informations from body
  const { name, description } = await req.body;
  //create data and save
  const repository = await getManager().getRepository(Data);
  const data = await repository.save({
    name: name,
    description: description,
  });
  const datas = await repository.find();
  try {
    res.status(200).render("datas", {
      datas,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//share data
export const shareData: RequestHandler = async (req, res) => {
  const repository = await getManager().getRepository(Data);

  //get choosed data
  const data = await repository.findOne(req.params.id);
  data.share = true; //change data shared information
  await repository.save(data);

  //save data on shared table
  const sharedRepository = await getManager().getRepository(Shared);
  await sharedRepository.save(data);

  //if data description is to long, cut it for dashboard page
  if (data.description.length >= 200) {
    const shortDescription = data.description.substring(0, 200);
    await getConnection()
      .createQueryBuilder()
      .update(Shared)
      .set({ description: shortDescription })
      .where({ id: req.params.id })
      .execute();
  }
  try {
    res.redirect("/users/dashboard");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//like data
export const likeData: RequestHandler = async (req, res) => {
  const likesRepository = await getManager().getRepository(Likes);

  //check if the user has liked this data before
  const likesData = await likesRepository.findOne({
    where: { user_id: globalThis.userIN, data_id: req.params.id },
  });

  try {
    if (!likesData) {
      //if user didnt like
      const sharedRepository = await getManager().getRepository(Shared);

      //increase the number of likes of the data
      const sharedData = await sharedRepository.findOne(req.params.id);
      sharedData.likes++;
      await sharedRepository.save(sharedData); //update data

      //save the like in the Likes table
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Likes)
        .values({ user_id: globalThis.userIN, data_id: req.params.id }) //?userIN yerine reqsession userid?
        .execute();
    } else {
      //if user already liked
      const sharedRepository = await getManager().getRepository(Shared);

      //reduce the number of like of the data
      const sharedData = await sharedRepository.findOne(req.params.id);
      sharedData.likes--;
      //update likes number
      await sharedRepository.save(sharedData);

      /* When the user who liked the data clicks the like button again,
      undo the like and delete the record from the database. */
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Likes)
        .where({ data_id: req.params.id })
        .execute();
    }

    res.redirect("/users/datas/" + `${req.params.id}`);
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//comment data
export const commentData: RequestHandler = async (req, res) => {
  try {
    const sharedRepository = await getManager().getRepository(Shared);

    //increase the number of comments of the data
    const sharedData = await sharedRepository.findOne(req.params.id);
    sharedData.comments++;

    await sharedRepository.save(sharedData); //update data

    //save the comment in the Comments table
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Comments)
      .values({
        user_id: globalThis.userIN,
        data_id: req.params.id,
        comments: req.body.comments,
      })
      .execute();

    res.redirect("/users/datas/" + `${req.params.id}`);
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Create Movie
export const createMovie: RequestHandler = async (req, res) => {
  const { name, description } = await req.body; //get information from form
  const repository = await getManager().getRepository(Data);

  //create movie and save
  const movie = await repository.save({
    name: name,
    description: description,
    type: "movie",
    user_id: globalThis.userIN,
  });

  //get all movies to send it to movies page
  const movies = await repository.find({
    where: { user_id: globalThis.userIN, type: "movie" },
  });
  try {
    res.status(200).render("movies", {
      movies,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Create Actor
export const createActor: RequestHandler = async (req, res) => {
  const { name, description } = await req.body; //get informations
  const repository = await getManager().getRepository(Data);

  //create actor and save
  const actor = await repository.save({
    name: name,
    description: description,
    type: "actor",
    user_id: globalThis.userIN,
  });

  //get all actors to send it to actors page
  const actors = await repository.find({
    where: { user_id: globalThis.userIN, type: "actor" },
  });

  try {
    res.status(200).render("actors", {
      actors,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Get All Movies
export const getAllMovies: RequestHandler = async (req, res) => {
  try {
    const repository = getManager().getRepository(Data);

    //get all movies and send it to movies page
    const movies = await repository.find({
      where: { user_id: globalThis.userIN, type: "movie" },
    });

    res.status(200).render("movies", {
      movies,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Get All Actors
export const getAllActors: RequestHandler = async (req, res) => {
  try {
    const repository = getManager().getRepository(Data);

    //get all movies and send it to movies page
    const actors = await repository.find({
      where: { user_id: globalThis.userIN, type: "actor" },
    });

    res.status(200).render("actors", {
      actors,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Delete Data
export const deleteData: RequestHandler = async (req, res) => {
  try {
    //find and delete the data to be deleted in the database
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);
    await repository.delete(data);

    //delete data from Shared table if data has been shared before
    if (data.share === true) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Shared)
        .where({ id: req.params.id })
        .execute();
    }

    res.redirect("/users/" + `${data.type}` + "s");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Get Data Page
export const getData: RequestHandler = async (req, res) => {
  try {
    //find data in shared table
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);
    const sharedRepository = getManager().getRepository(Shared);
    const shared = await sharedRepository.findOne(req.params.id);

    //get all users
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    //get all comments for this data
    const commentsRepository = getManager().getRepository(Comments);
    const comments = await commentsRepository.find({
      where: { data_id: req.params.id },
    });

    res.render("data", {
      data,
      shared,
      comments,
      users,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Update Data
export const updateData: RequestHandler = async (req, res) => {
  try {
    //find data from Data table
    const repository = getManager().getRepository(Data);
    const data = await repository.findOne(req.params.id);

    //update data information and save
    data.name = req.body.name;
    data.description = req.body.description;
    await repository.save(data);

    //update data from Shared table if data has been shared before
    if (data.share === true) {
      await getConnection()
        .createQueryBuilder()
        .update(Shared)
        .set({ name: req.body.name, description: req.body.description })
        .where({ id: req.params.id })
        .execute();
    }
    res.redirect("/users/" + `${data.type}` + "s");
  } catch {
    res.status(400).json({
      status: "fail",
      Error,
    });
  }
};

//Get Update Page
export const getEditPage: RequestHandler = async (req, res) => {
  //get edit page for this data
  const repository = getManager().getRepository(Data);
  const data = await repository.findOne(req.params.id);
  res.status(200).render("edit", {
    data,
  });
};
