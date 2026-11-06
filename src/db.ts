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
    password: String
})

const userModel = mongoose.model("User",userSchema);

export default userModel;