import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    stock:{
      type:Number,
      required:true
    }

 
    
},
{ timestamps: true }
);

const Order =  mongoose.model("Order", orderSchema);
export default Order;