import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import connectDb from "./db/dbConnect.js";
import usersRoute from "./routes/users.route.js";
import transactionsRoute from "./routes/transactions.route.js";
import accountRoute from "./routes/account.route.js";
import globalErrHandler from "./middlewares/globalErrHandler.js";

dotenv.config()

const app = express();

//middlewares
//pass incomming data 
app.use(express.json())
app.use(cors())


//users route
app.use("/api/v1/users", usersRoute);
//account routes
app.use("/api/v1/accounts", accountRoute);
//transactions routes
app.use("/api/v1/transactions", transactionsRoute);

//Error handlers
app.use(globalErrHandler);

//listen to server 
connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
    app.on("errror", (error) => {
        console.log("ERRR: ", error);
        throw error
    })
})
.catch((err) => {
    console.log("MongoDb connection failed!!",err)
})