const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectToMongoDB = require("./config/mongooseConnection");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("trust proxy", 1); // For secure cookies in production
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || "default",
  })
);
app.use(flash());

app.set("view engine", "ejs");

app.use("/users", userRouter);
app.use("/owner", ownerRouter);
app.use("/product", productRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
  connectToMongoDB();
  console.log("Server is running on http://localhost:3000");
});
