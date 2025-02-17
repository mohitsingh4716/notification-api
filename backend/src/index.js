import express from "express";

const app= express();

import cors from "cors";
import dotenv from "dotenv";

import notificationRoutes from "./routes/notification.js";

dotenv.config();

const PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", notificationRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})