require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./config/db");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { postRouter } = require("./routes/post.route");
const { authRouter } = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/auth", authRouter);
app.use(authenticate);
app.use("/post", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Server is connected to DB.");
  } catch (err) {
    console.log("Something went wrong while connecting to DB.", err);
  }
  console.log(`Server is running on port ${process.env.port}.`);
});
