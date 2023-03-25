const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());

router.post('/signup', async(req,res) => {
    const {email, password} = req.body;
    let user = await User.findOne({email});
    if(user){
        res.status(400).json("User Already Exists");
    }else{
        const userDoc = await User.create({
            email,
            password:bcrypt.hashSync(password, salt)
        })
        res.json(userDoc);
    }
});

module.exports = router;