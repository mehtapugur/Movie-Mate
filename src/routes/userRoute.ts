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
  getAddPage,
  getEditPage,
  createMovie,
  getAllMovies,
  deleteMovie,
  getMovie,
  updateMovie,
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

//router.get("/movies", movieController.getAllMovies); //?
router.get("/add", auth, getAddPage);
//router.post("/add", createMovie);
router.post("/movies", createMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/movies/edit/:id", getEditPage);
router.put("/movies/:id", updateMovie);

const userRouter = router;
export default userRouter;
