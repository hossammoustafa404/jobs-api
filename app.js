require("express-async-errors"); //must be at the begining of the code
const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");
const userRouter = require("./routes/user");
const jobsRouter = require("./routes/jobs");
const authMiddleware = require("./middleware/auth");
const app = express();

// Security requiers
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter);

app.use(notFoundMiddleware);

// Error handler middleware
app.use(errorHandlerMiddleware);

// App start
const port = process.env.PORT || 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log(`Connected to database...`);
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
};

start();
