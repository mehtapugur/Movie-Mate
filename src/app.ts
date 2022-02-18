/**
 * Gusto & RemoteTeam Node.js Bootcamp
 * Final Project
 * Mehtap Ugur
 */

/**
 * Imports
 */
import * as dotenv from "dotenv";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import bcrypt from "bcrypt";
import pageRoute from "./routes/pageRoute";
import userRoute from "./routes/userRoute";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { getManager } from "typeorm";
import passport from "passport";
import Strategy from "passport-facebook";
const MemoryStore = require("memorystore")(session);
const { OAuth2Client } = require("google-auth-library");
const methodOverride = require("method-override");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

dotenv.config();
//create app and use .env variables
const app = express();
//require("dotenv").config();

// iew engine
app.set("view engine", "ejs");

//give error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
  console.log(err.message, err.name);
  process.exit(1);
});

//middlewares
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("trust proxy", 1);
// app.enable("trust proxy");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: "none",
      secure: true,
      maxAge: 600000,
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*
  Google Auth for Sign-In with Google account
*/
app.post("/googleAuth", (req, res) => {
  //get token
  let token = req.body.token;

  //verify user
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const password = payload.sub;
    const repository = await getManager().getRepository(User);
    //find user in repository
    const user = await repository.findOne({
      where: { email: payload.email },
    });

    //if user doesnt exist, create and save
    if (!user) {
      const user = await repository.save({
        name: payload.given_name,
        surname: payload.family_name,
        email: payload.email,
        password: await bcrypt.hash(password, 8),
      });
      req.session.userID = user.id;
    }

    //save user.is to session
    req.session.userID = user.id;
  }
  //call verify function
  verify()
    .then(() => {
      res.cookie("jwt", token); //save jwt to cookie
      res.send("success");
    })
    .catch(console.error);
});

//check user and go to dashboard page
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.status(200).redirect("/users/dashboard");
});

//check user to login with google account
function checkAuthenticated(req, res, next) {
  let token = req.cookies["jwt"];

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
  }
  verify()
    .then(() => {
      next();
    })
    .catch((err) => {
      res.redirect("/login");
    });
}

//save user id for every request
app.use("*", (req, res, next) => {
  globalThis.userIN = req.session.userID;
  console.log("userIN:", globalThis.userIN);
  next();
});

//main routes
app.use("/", pageRoute);
app.use("/users", userRoute);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/facebook",
      profileFields: ["id", "name", "emails"],
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      globalThis.token = accessToken;

      const repository = await getManager().getRepository(User);
      //find user in repository
      const user = await repository.findOne({
        where: { email: profile.emails[0].value },
      });

      //create password
      const password = profile.id;
      //if user doesnt exist, create and save
      if (!user) {
        const user = await repository.save({
          name: profile.name.givenName,
          surname: profile.name.familyName,
          email: profile.emails[0].value,
          password: await bcrypt.hash(password, 8),
        });
        //save user id
        globalThis.userIN = user.id;
      } else {
        globalThis.userIN = user.id;
      }

      done(null, profile);
    }
  )
);

app.use(
  "/fb/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.use(
  "/auth/facebook",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
  }),
  function (req: any, res) {
    req.session.userID = globalThis.userIN;
    //save jwt in cookie
    res.cookie("jwt", globalThis.token);
    res.redirect("/dashboard");
  }
);

//Connection with MySQL database
createConnection()
  .then(() => {
    const port = process.env.PORT || 5000;

    app.listen(port, () => {
      console.log(`Sunucu ${port} portunda başlatıldı`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/404", (req, res) => {
  res.render("404");
});
