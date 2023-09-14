// create server
const express = require("express");
const app = express();

//require package
const bodyParser = require("body-parser");
const port = 6868;
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

//require routes
const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");

//setup routes
app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);

// use package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
