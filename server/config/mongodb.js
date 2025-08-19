import mongoose from "mongoose";
import { MONGODB_URI } from "./configuration.js";

const connectDB = async() => {

    mongoose.connection.on('connected',()=>{
        console.log("Database connected")
    })

    await mongoose.connect(`${MONGODB_URI}/collegeLMS`)
} 

export default connectDB