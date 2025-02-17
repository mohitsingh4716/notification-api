import express from "express";

const router= express.Router();

router.get("/notification", (req, res)=>{
    res.json({
        message: "notification routes"
    })
})

export default router;