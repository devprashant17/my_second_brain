import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {userModel,contentModel} from "./db.js";
import {z} from 'zod';
import dotenv from 'dotenv'

const app = express();

dotenv.config();

const JWT_SECRET:any = process.env.JWT_SECRET;
const uri:any = process.env.MONGO_URI;
await mongoose.connect(uri);

app.use(express.json());

const signupSchema = z.object({
    username: z.string()
    .min(3,"Username must be at least 3 characters")
    .max(10,"Username cannot exceed 10 characters"),

    password: z.string()
    .min(8,"Password must be at least 8 characters")
    .max(20,"Password cannot exceed 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character")
});

const signinSchema = z.object({
    username: z.string(),
    password: z.string()
})

function authentication(req:any,res:any,next:any){
    const token:any = req.headers.token;

    interface MyJwtPayload extends jwt.JwtPayload {
    userId: string;
    }

    try{
        const decodedInfo = jwt.verify(token,JWT_SECRET);
        res.locals.userId = (decodedInfo as MyJwtPayload).userId;
        next();
    }
    catch{
        return res.status(403).send("Invalid Token!");
    }


}

app.post('/api/v1/signup',async (req,res)=>{
    const result = signupSchema.safeParse(req.body);
    
    try{
        if(!result.success){
            return res.status(411).send("Error in input");
        }

        const user = result.data;
        const UserDB = await userModel.create({
            username: user.username,
            password: user.password
        })
        return res.status(200).json({
            message:"You are signed up!"
        })        
    }
    catch(err:any){
        if(err.code==11000){
          return res.status(403).send("Username taken!")  
        }
 
        return res.status(500).send("Server Error 500!")
    }
});

app.post('/api/v1/signin',async (req,res)=>{
   try{
        const username = req.body.username;
        const password = req.body.password;
                
        const foundUser:any = await userModel.findOne({
            username: username,
            password: password
        });

        if(!foundUser){
            return res.status(403).send("Wrong Credentials!");
        }

        const token = jwt.sign({userId:foundUser._id},JWT_SECRET);  // Should not include password here

        return res.status(200).json({
            token: token
        });
    }
    catch{
        return res.status(500).send("Server Error 500!")
    }
});

app.post('/api/v1/content',authentication,async (req,res)=>{
    const content:any = req.body;
    const userId = res.locals.userId;

    await contentModel.create({
        type: content.type,
        link: content.link,
        title: content.title,
        tags: content.tags,
        userId: userId
    });

});

app.get('/api/v1/content',(req,res)=>{

});

app.delete('/api/v1/content',(req,res)=>{

});

app.post('/api/v1/brain/share',(req,res)=>{

});

app.get('/api/v1/brain/:shareLink',(req,res)=>{

});

app.listen(3000,()=>{
    console.log("Listening on port 3000...");
})
