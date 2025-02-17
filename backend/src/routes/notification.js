import express from "express";
import { sendNotification } from "../controllers/notifyController.js";



const router= express.Router();

router.post("/notification", sendNotification)

export default router;