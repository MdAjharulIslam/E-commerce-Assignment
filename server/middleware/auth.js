import express from "express"
import jwt from "jsonwebtoken"
const userAuth = (req, res, next)=>{
    try {
         const authHeader = req.headers.authorization;


        if(!authHeader){
            return res.json({
            success:false,
            message:"authHeader is missing"
        })
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return res.json({
                success:false,
                message:"token is missing"
            })
        }


        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.json({
            success:false,
            message:"internal server error in auth"
        })
    }
}

export default userAuth;