import express from "express";
// import session from "express-session";
// import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// import { createConnection } from "typeorm";
// import { User } from "./entity/user.entity";
import path from "path";
// import authRoute from "./routes/authRoute";
// import { auth, userControl } from "./middlewares/authMiddleware";
// import { getHomePage } from "./controllers/authController";
import pageRoute from "./routes/pageRoute";

const app = express();
// require("dotenv").config();

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
//app.use(cookieParser());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       maxAge: 600000,
//       httpOnly: true,
//     },
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// createConnection({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   password: "root",
//   database: "node_auth",
//   entities: [User],
//   synchronize: false,
//   logging: false,
// });

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

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

// //const PORT = process.env.PORT;
// const HOST = process.env.HOST;

// app.listen(3000, HOST, () => {
//   console.log(`Server is listening ${HOST}:3000`);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running.`);
});
