import mongoose from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

const connectDb = async(DATABASE_URL)=>{
    try {
        const DB_OPTIONS = {
            dbName : "user-task"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(error.message);
    }
}

connectDb(DATABASE_URL);

export default connectDb;