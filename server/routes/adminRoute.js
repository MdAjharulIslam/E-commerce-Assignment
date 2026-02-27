import express from "express";
import { adminLogin, deleteProductAdmin, getAdminDashboardStats, getAllOrdersAdmin, getAllProductsAdmin, updateProductAdmin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();


adminRouter.post('/login', adminLogin)
adminRouter.get("/products", adminAuth, getAllProductsAdmin);
adminRouter.put("/products/:id",  adminAuth, updateProductAdmin);
adminRouter.delete("/products/:id", adminAuth, deleteProductAdmin);
adminRouter.get("/orders", adminAuth, getAllOrdersAdmin);
adminRouter.get("/dashboard",  adminAuth, getAdminDashboardStats);
export default adminRouter;