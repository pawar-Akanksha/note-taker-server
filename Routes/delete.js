const express = require ("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "notetaker";
const Note = require ("../Models/Note");
const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post('/delete',async(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token,secret,{},async (err,info)=>{
        if(err) throw err;
        Note.deleteMany({id:info.id});
    })
})
module.exports = router;