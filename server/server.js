import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js"
import productRouter from "./routes/productRoute.js";

import orderRouter from "./routes/orderRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;
await connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("app is working");
});

app.use("/api/user", userRouter);
app.use('/api/admin', adminRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter )

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
