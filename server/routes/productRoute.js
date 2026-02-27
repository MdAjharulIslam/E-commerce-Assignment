import express from "express"
import { addProduct, deleteProduct, getAllProducts, getLatestAddedProducts, getSingleProduct, updateProduct } from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
const productRouter = express.Router();


productRouter.post('/add',upload.single("image"), addProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/latest-product',  getLatestAddedProducts)
productRouter.get('/:id', getSingleProduct);
productRouter.post('/update/:id', adminAuth , updateProduct);
productRouter.get('/delete/:id', adminAuth ,deleteProduct);


export default productRouter;