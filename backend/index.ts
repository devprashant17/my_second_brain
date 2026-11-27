import express from "express";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {userModel,contentModel} from "./db.js";
import {z} from 'zod';
import dotenv from 'dotenv'
import { randomUUID } from 'crypto';
import cors from 'cors';

const app = express();

dotenv.config();

const JWT_SECRET:any = process.env.JWT_SECRET;
const uri:any = process.env.MONGO_URI;
await mongoose.connect(uri);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    next();
});

app.use(cors());
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
    // catch(err:any){
    //     if(err.code==11000){
    //       return res.status(403).send("Username taken!")  
    //     }
 
    //     return res.status(500).send("Server Error 500!")
    // }
    catch (err: any) {
    console.log("FULL ERROR:", err);
    console.log("ERROR CODE:", err.code);
    console.log("KEY PATTERN:", err.keyPattern);
    console.log("KEY VALUE:", err.keyValue);

    if (err.code === 11000) {
        return res.status(403).send("Username taken!");
    }

    return res.status(500).send("Server Error 500!");
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
    catch(err){

        return res.status(500).send("Server Error 500!")
    }
});

app.get('/api/v1/username',authentication,async (req,res)=>{
    try{
        const userId = res.locals.userId;

        const user = await userModel.findOne({
            _id: userId
        });


        return res.status(200).json({
            username: user?.username
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error!");
    }
    

});

app.get('/api/v1/tags',authentication,async (req,res)=>{
    try{
        const userId = res.locals.userId;

        const content = await contentModel.find({
            userId: userId
        });


        return res.status(200).json({
            content: content
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error!");
    }
    

});

app.post('/api/v1/content',authentication,async (req,res)=>{
    try{
        const content:any = req.body;
        const userId = res.locals.userId;

        await contentModel.create({
            type: content.type,
            link: content.link,
            title: content.title,
            tags: content.tags,
            userId: userId,
            fav: false
        });

        return res.status(200).json({
            message: "Content added successfully!"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error!");
    }
    

});

app.put('/api/v1/content/update',authentication,async (req,res)=>{
    try{
        const content:any = req.body;
        const userId = res.locals.userId;

        await contentModel.findOneAndUpdate({
            _id: content.contentId
        },
        {
            type: content.type,
            link: content.link,
            title: content.title,
            tags: content.tags,
            userId: userId
        }
    );

        return res.status(200).json({
            message: "Content updated successfully!"
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server Error!");
    }
    

});

app.put("/api/v1/content/favorite", authentication, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        const fav = req.body.fav;
        const userId = res.locals.userId;

        const updatedContent = await contentModel.findOneAndUpdate(
            {
                _id: contentId,
                userId: userId
            },
            {
                fav: fav
            },
            {
                returnDocument: 'after' 
            }
        );

        if (!updatedContent) {
            return res.status(404).json({
                message: "Content not found"
            });
        }

        return res.status(200).json({
            message: "Favorite updated successfully",
            content: updatedContent
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
});

app.get("/api/v1/content/favorite", authentication, async (req, res) => {
    try{
        const userId = res.locals.userId;

        const allContents = await contentModel.find({
            userId: userId,
            fav: true
        })

        return res.status(200).json({
            content: allContents
        });
    }

    catch(err){
        console.log(err);
        return res.status(500).send("Server error 500!");
    }
});

app.get('/api/v1/content',authentication,async (req,res)=>{
    try{
        const userId = res.locals.userId;

        const allContents = await contentModel.find({
            userId: userId
        })

        return res.status(200).json({
            content: allContents
        });
    }

    catch(err){
        console.log(err);
        return res.status(500).send("Server error 500!");
    }


});

app.delete('/api/v1/content',authentication,async (req,res)=>{
    try{
        const userId = res.locals.userId;
        const contentId =  req.body.contentId;

        const toBeDeleted = await contentModel.findOneAndDelete({
            userId:  userId,
            _id: contentId
        })

        if(!toBeDeleted){
            return res.status(403).json({
                msg:"No document found!"
            });
        }

        return res.status(200).json({
            deleted: toBeDeleted
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).send("Server error 500!");
    }
});

app.post('/api/v1/brain/share',authentication,async (req,res)=>{
    try{
        const share = req.body.share;
        const userId = res.locals.userId;

        let user: any = await userModel.findOne({
            _id: userId
        });

        if(!user){
            return res.status(404).send("User not found!");
        }

        if(!share){
            await userModel.findOneAndUpdate({
                _id: userId
            },{
                share: false
            });
            return res.status(200).send("Sharing is disabled!");
        }

        user = await userModel.findOneAndUpdate({
                _id: userId
            },{
                share: true
            });

        if(!user.shareLink){
            const shareId = randomUUID();
            let updatedUser = await userModel.findOneAndUpdate({
                _id: userId
            },{
                shareLink: shareId
            },{
                new: true
            });
            user = updatedUser;
        }

        const link = `http://localhost:3000/api/v1/brain/${user.shareLink}`;

        return res.status(200).json({
            link: link
        });
    }
    catch{
        return res.status(500).send("Server Error 500!");
    }
});

app.get('/api/v1/brain/:shareLink',async (req,res)=>{
    try{
        const shareLink = req.params.shareLink;

        const foundUser: any = await userModel.findOne({
            shareLink: shareLink
        });

        if (!foundUser) {
             return res.status(404).json({
                msg: "Invalid share link"
        });
        }

        if (!foundUser.share) {
             return res.status(404).send("Sharing is disbled");
        }

        const foundContent = await contentModel.find({
            userId: foundUser._id
        });

        return res.status(200).json({
            username: foundUser.username,
            content: foundContent
      });
    }
    catch{
        return res.status(500).send("Server Error 500!");
    }

});

app.get('/', (req, res) => {
    res.send("My Second Brain API is running!");
});

app.listen(3000,()=>{
    console.log("Listening on port 3000........");
})

