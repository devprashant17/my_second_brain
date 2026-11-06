import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {z} from 'zod';

const app = express();

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

app.post('/api/v1/signup',(req,res)=>{
    const result = signupSchema.safeParse(req.body);
    console.log(result);
    if(!result.success){
        return res.status(411).send("Error in input");
    }

    const user = result.data;

    res.status(200).json({
        message:"You are signed up!"
    })
});

app.post('/api/v1/signin',(req,res)=>{

});

app.post('/api/v1/content',(req,res)=>{

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
