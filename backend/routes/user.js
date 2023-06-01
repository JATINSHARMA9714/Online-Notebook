const express = require('express');
const User = require('../models/User');
const bycrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const secret="jatinsharma";
const jwt=require('jsonwebtoken');
const fetchuser = require('../middlewares/fetchuser');


//ROUTE-1 creating a user - Sign in
router.post('/create', [
    body('name', "enter a valid name").isLength({ min: 1 }),
    body('email', "enter a valid email").isEmail(),
    body('password').isLength({ min: 3 }),
], async (req, res) => {
    //check if user already exists
    let findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
        success=false
        return res.status(400).json({success:success,message:"User Already Exists"});
    }
    //valid details error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
        res.status(400).json({success,errors});
    }
    else {
        //password encryption
        let salt = bycrypt.genSaltSync(10);
        let secPass = bycrypt.hashSync(req.body.password, salt);
        //no validation error then creating user
        let newUser = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        //token
        const data={
            user:{
                id:newUser.id
            }
        }
        const authToken=jwt.sign(data,secret);
        success=true;
        res.json({success:success,message:authToken});
    }
})

//ROUTE - 2 Login User
router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password', "Cannot be empty").exists(),
], async (req, res) => {
    //valid details error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
        res.status(400).json({success:success,error:errors});
    }
    else {
        //check if user already exists
        let findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            success=false;
            return res.status(400).json({success:success,message:"User Does Not Exists"});
        }
        //Password Comparison
        const passCompare = bycrypt.compareSync(req.body.password, findUser.password);
        if (passCompare) {
            //user login success
            const data={
                user:{
                    id:findUser.id
                }
            }
            const authToken=jwt.sign(data,secret);
            success=true;
            res.json({success:success,authToken:authToken});
        }
        else {
            success=false
            res.status(400).json({success:success,message:"User Not Found"})
        }
    }
})

//endpoint to extact data from authToken
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        const userid=req.user.id;
        const userr=await User.findById(userid).select('-password');
        res.json(userr);
    }
    catch{
        res.status(400).send("User Not Found");
    }
})
module.exports = router