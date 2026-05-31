import express from "express"; 
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'http://localhost:3000',
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at prot ${PORT}`);
});
