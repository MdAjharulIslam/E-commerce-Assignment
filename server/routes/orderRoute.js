import express from "express";
import { addOrder, getUserOrders } from "../controllers/orderController.js";
import auth from '../middleware/auth.js';

const orderRouter = express.Router();

// Use :id for product
orderRouter.post("/add/:id", auth, addOrder);
orderRouter.get("/myorders", auth, getUserOrders);
export default orderRouter;