import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import "./database/index.js";

// Routes
import authUserRouter from "./routes/auth/index.js";
import memberRouter from "./routes/member/index.js";
import addressTypeRouter from "./routes/addressType/index.js";
import committeeRouter from "./routes/committee/index.js";
import financeRouter from "./routes/finance/index.js";
import prayerRequestRouter from "./routes/prayerRequest/index.js";
import sacramentRouter from "./routes/sacrament/index.js";
import spiritualRouter from "./routes/spiritual/index.js";
import commentRouter from "./routes/comment/index.js";
import priestDelegationRouter from "./routes/priestDelegation/index.js";
import contributionRouter from "./routes/contribution/index.js";
import eventRouter from "./routes/event/index.js";
import globalErrorHandler from "./middlewares/error/index.js";
import staticRouter from "./routes/staticData/index.js";
import subscribeRouter from "./routes/subscribe/index.js";

// Express app
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// Security key holder
dotenv.config();

// Display tiny changes
app.use(morgan("tiny"));

// End points
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/addressTypes", addressTypeRouter);
app.use("/api/v1/committees", committeeRouter);
app.use("/api/v1/reports", financeRouter);
app.use("/api/v1/prayers", prayerRequestRouter);
app.use("/api/v1/sacraments", sacramentRouter);
app.use("/api/v1/spirituals", spiritualRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/delegations", priestDelegationRouter);
app.use("/api/v1/contributions", contributionRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/data", staticRouter);
app.use("/api/v1/subscribers", subscribeRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

// Server Listener
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server starts on port ${port}`.blue.bold);
});
