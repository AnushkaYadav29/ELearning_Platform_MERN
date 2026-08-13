const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const roleRoutes = require("./routes/roleRoutes");
const adminStudentRoutes = require("./routes/adminStudentRoutes");
const userRoutes = require("./routes/userRoutes");

const notFound = require("./middleware/notFoundMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test-role", roleRoutes);

app.use(
  "/api/admin/students",
  adminStudentRoutes
);

app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;