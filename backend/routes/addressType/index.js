import express from "express";
import {
  createAddressType,
  getAllAddressTypes,
} from "../../controllers/addressType/index.js";

// Address Type Router
const addressTypeRouter = express.Router();

// Address Type Routes
addressTypeRouter.post("/new", createAddressType);

addressTypeRouter.get("/", getAllAddressTypes);

// Export Address Type Router
export default addressTypeRouter;
