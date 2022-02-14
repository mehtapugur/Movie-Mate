/**
 * Imports
 */
import {
  getIndexPage,
  getRegisterPage,
  getLoginPage,
} from "../controllers/pageController";
import { isLogged } from "../middlewares/authMiddleware";

const router = require("express").Router();

//Routes for get home,login and register pages
router.route("/").get(isLogged, getIndexPage);
//Before routing login page, check first if user is already logged in or not.
router.route("/login").get(isLogged, getLoginPage);
router.route("/signup").get(isLogged, getRegisterPage);

const pageRouter = router;
export default pageRouter;
