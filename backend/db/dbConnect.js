import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log(`\n Mongodb connected successfully!!`)
    }catch(err){
        console.log("MongoDb connection failed",err)
        process.exit(1);
    }
}
export default connectDb;