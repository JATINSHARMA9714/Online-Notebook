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
    let findUser = await user.findOne({ email: req.body.email });
    if (findUser) {
        return res.status(400).send("User Already Exists");
    }
    //valid details error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors);
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
        res.json({authToken});
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
        res.status(400).send(errors);
    }
    else {
        //check if user already exists
        let findUser = await User.findOne({ email: req.body.email });
        if (!findUser) {
            return res.status(400).send("User Does Not Exist");
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
            res.json({authToken});
        }
        else {
            res.status(400).send("User Not Found")
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