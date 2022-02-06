import {
  getIndexPage,
  getRegisterPage,
  getLoginPage,
} from "../controllers/pageController";
import { getDashboardPage } from "../controllers/userController";
import { auth } from "../middlewares/authMiddleware";
const passport = require("passport");
// import { alreadyLogin } from "../middlewares/checkAlreadyLogin"
const router = require("express").Router();

//Routes for get home,login and register pages
router.route("/").get(getIndexPage);
router.route("/signup").get(getRegisterPage);
// //Before routing login page, check first if user is already logged in or not.
router.route("/login").get(/*alreadyLogin,*/ getLoginPage);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/return",
  passport.authenticate("google", { failureRedirect: "/" }),
  //res.redirect("/");
  //res.status(200).render("dashboard");
  getDashboardPage
  //res.end("logged");
);

const pageRouter = router;
export default pageRouter;
