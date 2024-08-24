const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const schoolRoute = require("./routes/school_routes");
const rateLimit = require("express-rate-limit");

dotenv.config({});

const server = async () => {
  const app = express();

  // Middlewares
  // Enable trust proxy to correctly handle the X-Forwarded-For header
  app.set("trust proxy", 1);

  // Middleware to parse incoming JSON requests
  app.use(bodyParser.json());

  // Middleware to parse URL-encoded data
  app.use(bodyParser.urlencoded({ extended: true }));

  // Rate Limiter Middleware
  // Limits each IP to 100 requests per 15 minutes
  // Prevents abuse by users sending too many requests in a short period
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
  });

  app.use(limiter);

  // Set the port for the server (default to 3000 if not specified in environment variables)
  const PORT = process.env.PORT || 3000;

  // Routes for the school-related API endpoints
  app.use("/api/v1/school", schoolRoute);

  app.get("/", (req, res) => {
    return res.status(200).json({
      message: "School API server is up and running...",
      status: "ok",
    });
  });

  app.use((err, req, res, next) => {
    return res.status(404).json({
      error: "Route not found",
    });
  });
  app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
  });
};

server();
