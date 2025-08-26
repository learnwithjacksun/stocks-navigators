import mongoose from "mongoose";
import envFile from "./env.js";
import process from "process";

export default async function connectDB() {
    try {
        await mongoose.connect(envFile.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

