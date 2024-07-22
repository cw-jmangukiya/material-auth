import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // Cors Middleware
app.use(express.json({ limit: "16kb" })); // Json Middleware
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Get Request Middleware
app.use(express.static("public")); // Static Middleware
app.use(cookieParser()); // Cookies Middleware

// Routes
import healthcheckRouter from "./routes/healthcheck.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js";
import { ApiError } from "./utils/ApiError.js";

// Routes Declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.post("/api/v1/auth/login", (req, res) => {
  const {
    email,
    password,
    accessToken,
    companyId = 91,
    deviceId = "123456789",
  } = req.body;

  if (!email || !password || !accessToken) {
    throw new ApiError(
      400,
      "All fields are required, email password,accessToken"
    );
  }
  if (email === "wrong@email.com" && password === "Admin@123") {
    throw new ApiError(401, "Invalid userId and password");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      {
        email: email,
        password: password,
        companyId: companyId,
        accessToken: accessToken,
        deviceId: deviceId,
      },
      "Success"
    )
  );
});

export { app };
