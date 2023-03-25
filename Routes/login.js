const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const secret = "notetaker";

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post("/login", async(req,res) =>{
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    const passwordOK = bcrypt.compareSync(password, userDoc.password);
    if(passwordOK){
        jwt.sign({email, id: userDoc._id}, secret, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                email
            });
        });
    }else{
        res.status(400).json('Invalid Credentials');
    }
});

module.exports = router;