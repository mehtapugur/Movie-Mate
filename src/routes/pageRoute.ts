import {
  getIndexPage,
  getRegisterPage,
  getLoginPage,
} from "../controllers/pageController";
// import { alreadyLogin } from "../middlewares/checkAlreadyLogin"
const router = require("express").Router();

//Routes for get home,login and register pages
router.route("/").get(getIndexPage);
router.route("/signup").get(getRegisterPage);
// //Before routing login page, check first if user is already logged in or not.
router.route("/login").get(/*alreadyLogin,*/ getLoginPage);

const pageRouter = router;
export default pageRouter;
