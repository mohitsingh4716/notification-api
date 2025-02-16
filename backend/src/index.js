const express = require('express');

const app= express();

const cors= require("cors");
const dotenv= require("dotenv");

const notificationRoutes= require("./routes/notification");

dotenv.config();

const PORT= process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", notificationRoutes);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})