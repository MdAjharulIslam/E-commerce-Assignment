import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const addOrder = async (req, res) => {
  try {
    const { quantity, phone } = req.body;
    const { id: productId } = req.params; 
    const userId = req.userId;

    if (!productId || !quantity || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    
    const product = await Product.findOneAndUpdate(
      { _id: productId, stock: { $gte: qty } },
      { $inc: { stock: -qty } },
      { new: true }
    );

    if (!product) {
      return res.status(400).json({ success: false, message: "Not enough stock available" });
    }

    
    const order = await Order.create({
      customer: userId,
      product: productId,
      phone,
      stock: qty,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
      product: {
        name: product.name,
        price: product.price,
        remainingStock: product.stock,
      },
    });
  } catch (error) {
    console.error("Add Order Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};




export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

   
    const orders = await Order.find({ customer: userId })
      .populate('product', 'name price description stock') 
      .sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};