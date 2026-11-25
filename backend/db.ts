import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const uri:any = process.env.MONGO_URI

await mongoose.connect(uri);

const userSchema = new mongoose.Schema({
    username: {
        type: String ,
        unique: true
    },
    password: String,
    share: {
        type:Boolean,
        default: false
    },
    shareLink: {
        type: String,
        unique: true
    }
});

const contentSchema = new mongoose.Schema({
    type: {
        type:String,
        enum:["Document", "Tweet", "Youtube", "Link"]
    },
    link: String,
    title: String,
    tags: [String],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fav: Boolean
},
{
    timestamps: true
});


const userModel = mongoose.model("User",userSchema);
const contentModel = mongoose.model("Content",contentSchema);

export  {userModel,contentModel} ;
