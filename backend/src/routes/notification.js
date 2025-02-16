const express = require('express');

const router= express.Router();

router.get("/notification", (req, res)=>{
    res.json({
        message: "notification routes"
    })
})

module.exports= router;