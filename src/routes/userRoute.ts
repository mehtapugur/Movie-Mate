const router = require("express").Router();
const passport = require("passport");

import {
  loginUser,
  createUser,
  getDashboardPage,
} from "../controllers/userController";
// import {createUser, loginUser,getDashboardPage, logoutUser, getEditPage, editUser, deleteUser} from "../controllers/userController"
// import {registrationValidation, checkErrorsForRegister} from "../middlewares/registerValidator"
// import {loginValidation, checkErrorsForLogin} from '../middlewares/loginValidator'
// import { editValidation, checkErrorsForEdit } from "../middlewares/editValidator"
// import { hasAuth } from "../middlewares/auth"
import { auth } from "../middlewares/authMiddleware";
import {
  getAddMoviePage,
  getAddActorPage,
  getEditPage,
  createData,
  createMovie,
  createActor,
  getAllMovies,
  getAllActors,
  deleteData,
  getData,
  updateData,
  shareData,
} from "../controllers/userController";

// //http://localhost:3000/users/
// //Routes for register login POST, get dashboard page and logout process

// router.route('/edit').put(editValidation, checkErrorsForEdit, editUser)
// router.route('/edit').delete(deleteUser)
// router.route('/edit').get(getEditPage)
//router.route('/logout').get(logoutUser)
//reset cookie
router.get(
  "/logout",
  (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.cookie("connect.sid", "", { maxAge: 1 });
    next();
  },
  (req, res, next) => {
    res.redirect("/");
  }
);

// router.get(
//   "/return",
//   passport.authenticate("google", { failureRedirect: "/" }),
//   (req, res, next) => {
//     res.redirect("/");
//   }
// );

// router
//   .route("/signup")
//   .post(registrationValidation, checkErrorsForRegister, createUser);
// router.route("/login").post(loginValidation, checkErrorsForLogin, loginUser);
// //Before getting dashboard page check first the user has auth or does not.
// router.route('/dashboard').get(hasAuth, getDashboardPage)
router.get("/dashboard", auth, getDashboardPage);

//Login and Create
router.post("/login", loginUser);
router.post("/signup", createUser);

// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// n

//router.get("/datas", dataController.getAllDatas); //?
router.get("/add_movie", auth, getAddMoviePage);
router.get("/add_actor", auth, getAddActorPage);
//router.post("/add", createData);
router.post("/datas", createData);
router.post("/movies", createMovie);
router.post("/actors", createActor);
router.get("/movies", getAllMovies);
router.get("/actors", getAllActors);
router.get("/datas/:id", getData);
router.delete("/datas/:id", deleteData);
router.get("/datas/edit/:id", getEditPage);
router.get("/share/:id", shareData);
router.put("/datas/:id", updateData);

const userRouter = router;
export default userRouter;
