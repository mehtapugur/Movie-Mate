/**
 * Imports
 */
import {
  loginUser,
  createUser,
  getDashboardPage,
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
  likeData,
  commentData,
} from "../controllers/userController";
import { auth } from "../middlewares/authMiddleware";
const router = require("express").Router();

//reset cookie and logout
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

//Before getting dashboard page check user has auth or does not
router.get("/dashboard", auth, getDashboardPage);

//Login and Create user
router.post("/login", loginUser);
router.post("/signup", createUser);

//movie routers
router.get("/add_movie", auth, getAddMoviePage);
router.post("/movies", auth, createMovie);
router.get("/movies", auth, getAllMovies);

//actor routers
router.get("/add_actor", auth, getAddActorPage);
router.post("/actors", auth, createActor);
router.get("/actors", auth, getAllActors);

//data routers
router.post("/datas", auth, createData);
router.put("/datas/:id", auth, updateData);
router.get("/datas/:id", auth, getData);
router.delete("/datas/:id", auth, deleteData);
router.get("/datas/edit/:id", auth, getEditPage);

//share, likes and comments routing
router.get("/share/:id", auth, shareData);
router.put("/likes/:id", auth, likeData);
router.put("/comments/:id", auth, commentData);

const userRouter = router;
export default userRouter;
