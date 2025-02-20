import express from "express";
import { sendNotification } from "../controllers/notifyController.js";



const router= express.Router();

router.post("/notify-booking", sendNotification)

export default router;