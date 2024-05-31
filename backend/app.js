import express from "express";
import cors from "cors";
import router from "./routes/web.js";
import connectDb from "./db/connectDb.js";

const app = express();
const port = process.env.port || 4000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
  }
  
app.use(cors(corsOptions));

app.use(express.json())


app.use("/",router);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
