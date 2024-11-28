import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cookieParser from "cookie-parser";
import "./database/index.js";

// Routes
import authUserRouter from "./routes/auth/index.js";
import memberRouter from "./routes/member/index.js";
import committeeRouter from "./routes/committee/index.js";
import financeRouter from "./routes/finance/index.js";
import commentRouter from "./routes/comment/index.js";
import priestDelegationRouter from "./routes/priestDelegation/index.js";
import contributionRouter from "./routes/contribution/index.js";
import eventRouter from "./routes/event/index.js";
import staticRouter from "./routes/staticData/index.js";
import subscribeRouter from "./routes/subscribe/index.js";
import globalErrorHandler from "./middlewares/globalError/index.js";
import serviceRouter from "./routes/service/index.js";
import serviceCategoryRouter from "./routes/serviceCategory/index.js";
import massRouter from "./routes/mass/index.js";
import videoRouter from "./routes/video/index.js";
import annualBudgetRouter from "./routes/annualBudget/index.js";

// Express app
dotenv.config();
const app = express();
// const corsConfig =
//   process.env.NODE_ENV === "development"
//     ? {
//         origin: process.env.ORIGIN_URL,
//         credentials: true,
//       }
//     : {
//         origin: process.env.LIVE_URL,
//         credentials: true,
//       };

const allowedOrigins = [process.env.CLIENT_URL, process.env.LIVE_URL];

const corsConfig = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// End points
app.use("/api/v1/auth", authUserRouter);
app.use("/api/v1/members", memberRouter);
app.use("/api/v1/committees", committeeRouter);
app.use("/api/v1/reports", financeRouter);
app.use("/api/v1/masses", massRouter);
app.use("/api/v1/categories", serviceCategoryRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/delegations", priestDelegationRouter);
app.use("/api/v1/contributions", contributionRouter);
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/data", staticRouter);
app.use("/api/v1/subscribers", subscribeRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/budgets", annualBudgetRouter);

// Static assets
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

// Server Listener
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`The server starts on port ${port}`.blue.bold);
});
