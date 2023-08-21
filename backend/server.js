const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = 8080;
const mongoose = require("mongoose");
const path = require("path");
// dbのURLを.envファイルに
require("dotenv").config();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("dbと接続中...");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => console.log("サーバーが起動"));
