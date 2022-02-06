import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { User } from "./entity/user.entity";
import { Movie } from "./entity/movie.entity";
import { getManager } from "typeorm";
import { RequestHandler } from "express";
const methodOverride = require("method-override");
import path from "path";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
//const { OAuth2Client } = require("google-auth-library");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
//const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SESSION_SECRET } = process.env;
// import authRoute from "./routes/authRoute";
// import { auth, userControl } from "./middlewares/authMiddleware";
// import { getHomePage } from "./controllers/authController";
import pageRoute from "./routes/pageRoute";
import userRoute from "./routes/userRoute";

const app = express();
require("dotenv").config();

// view engine
app.set("view engine", "ejs");

//give error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

// middleware
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 600000,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
//app.use(passport.session());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "node_auth",
  entities: [User, Movie],
  synchronize: false,
  logging: false,
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// app.post("/google", (req, res) => {
//   const { token } = req.body;
//   client
//     .verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     })
//     .then((response) => res.send(response));
// });

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/return", //http://localhost:3000
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      console.log("*****************************");
      console.log(profile.id);
      console.log(profile.emails[0].value);
      console.log(profile.name.givenName);
      console.log(profile.name.familyName);
      const createUser = async () => {
        console.log("geldi1");
        try {
          console.log("geldi2");
          const repository = getManager().getRepository(User);
          const password = profile.id;
          const user = await repository.save({
            //id: profile.id,
            name: profile.name.givenName,
            surname: profile.name.familyName,
            email: profile.emails[0].value,
            password: await bcrypt.hash(password, 8),
          });

          //const browserInfo = req.headers["user-agent"];
          // const createToken = (id: string, browserInfo: string): string =>
          //   jwt.sign({ id, browserInfo }, process.env.JWT_SECRET, {
          //     expiresIn: "60m", //minutes, session time
          //   });
          // const token = createToken(user.id, browserInfo);
          // res.cookie("jwt", token, { httpOnly: true, maxAge: 600000 });
          //create new user
          console.log("geldim");
        } catch (err) {
          console.log("hata");
        }
      };
      createUser();
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// //check user
// app.use(userControl);

// // //main page
// // app.get("/", (req, res, next) => {
// //   res.render("index");
// // });
// // app.get("/home", auth, getHomePage);
// // //app.use("/users", authRoute); //?
// // app.use(authRoute);
// app.use("/", authRoute);
// app.use("/users", authRoute);

app.use("/", pageRoute);
app.use("/users", userRoute);

// //const PORT = process.env.PORT;
// const HOST = process.env.HOST;

// app.listen(3000, HOST, () => {
//   console.log(`Server is listening ${HOST}:3000`);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running.`);
});
