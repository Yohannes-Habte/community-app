import express from "express";
import {
  getAboutData,
  getHawkaAbeyAllo,
  getHeaderData,
  getParishPriest,
  getServiceData,
  getShepherds,
} from "../../controllers/staticData/index.js";

const staticRouter = express.Router();

staticRouter.get("/header", getHeaderData);
staticRouter.get("/home/shepherds", getShepherds);
staticRouter.get("/home/hawka-abey-allo", getHawkaAbeyAllo);
staticRouter.get("/about/parish-priest", getParishPriest);
staticRouter.get("/about", getAboutData);
staticRouter.get("/services", getServiceData);

export default staticRouter;
