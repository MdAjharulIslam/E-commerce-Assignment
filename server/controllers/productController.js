import Product from "../models/Product.js";
import getImageKit from "../config/imagekit.js";
import fs from "fs";
import Order from '../models/Order.js'

export const addProduct = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
 
   

    if (!name || !price || !stock || !description ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

     const image = req.file;
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imagekit = getImageKit();

    const imageBuffer = fs.readFileSync(image.path);

    const uploadImage = await imagekit.upload({
      file: imageBuffer,
      fileName: image.originalname,
      folder: "/salon",
    });

    const optimizedImageUrl = imagekit.url({
      path: uploadImage.filePath,
      transformation: [
        { width: "1280" },
        { quality: "auto" },
        { format: "webp" },
      ],
    });

    fs.unlinkSync(image.path);

    
    const product = await Product.create({
      name,
      price,
      stock,
      description,
      image: optimizedImageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (error) {
    console.error("Add Product Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Get All Products Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

   
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Single Product Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};





export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, stock, description } = req.body;

    
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, description },
      { new: true, runValidators: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!id) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};







export const getLatestAddedProducts = async (req, res) => {
  try {
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 }) 
      .limit(4)
      .lean(); 

    return res.status(200).json({
      success: true,
      latestProducts,
    });
  } catch (error) {
    console.error("Latest Added Products Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch latest products",
    });
  }
};