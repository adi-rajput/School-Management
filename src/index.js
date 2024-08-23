const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoute = require("./routes/school_routes");
dotenv.config({});

const server = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 3000;

  app.use("/api/v1/school", schoolRoute);
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

server();
