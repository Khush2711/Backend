require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
const PORT = 4000;
const connection = require("./Connection/connect");
const user = require("./Routes/routes");
connection();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4000", "http://localhost:5173"],
  })
);
app.use(express.json());
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.set(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
