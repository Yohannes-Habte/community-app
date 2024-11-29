import express from "express";
import {
  getAboutData,
  getParishPriest,
  getServiceData,
} from "../../controllers/staticData/index.js";

const staticRouter = express.Router();

staticRouter.get("/header");
staticRouter.get("/home/shepherds");
staticRouter.get("/home/hawka-abey-allo");
staticRouter.get("/about/parish-priest", getParishPriest);
staticRouter.get("/about", getAboutData);
staticRouter.get("/services", getServiceData);

export default staticRouter;
