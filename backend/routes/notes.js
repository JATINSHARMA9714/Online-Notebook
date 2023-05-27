const express=require('express');
const Notes=require('../models/Notes')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middlewares/fetchuser')
const jwt=require('jsonwebtoken')
//1-Get Notes /api/notes/getnotes
router.get('/getnotes',fetchuser,async(req,res)=>{
    try{
    let note= await Notes.find({user:req.user.id})
        if(!note){
            console.log("No Notes Found");
        }
        else{
            res.json(note);
        }
    }
    catch(err){
        res.status(500).send("Internal Server Error")
    }
})

//2-Create Notes /api/notes/createnotes
router.post('/createnotes',fetchuser,[
    //validation of notes
    body('title','Should not be Empty').exists(),
    body('description').isLength({min:5}),
],async(req,res)=>{
    try{
    //checking of validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors);
    }
    else{
let notes=await Notes.create({
    user:req.user.id,
    title:req.body.title,
    description:req.body.description
})
res.json(notes);
    }
}
catch(err){
    res.status(500).send("Internal Server Error")
}
})
//3-Update Notes /api/notes/updatenotes/id
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
    try{
    const {title,description}=req.body;
    const newNotes={}
    if(title){
        newNotes.title=title;
    }
    if(description){
        newNotes.description=description;
    }
    //check if user id exists in db
    let notes= await Notes.findById(req.params.id);
    if(!notes){
        res.status(404).send("Not Found");
    }
    //check if the same id user is updating
    if(notes.user.toString()!==req.user.id){
        res.status(401).send("Not Authorized");
    }
    else{
        //same user is updating then update 
        //** findByIdAndUpdate no longer accept callback function 
       notes=await Notes.findByIdAndUpdate(req.params.id,newNotes,{new:true})
       res.json(notes);
    }
}
catch(err){
    res.status(500).send("Internal Server Error")
}
})
//4-Delete Note /api/notes/deletenotes/id
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
    //check if user id exists in db
    try{
    let notes= await Notes.findById(req.params.id);
    if(!notes){
        res.status(404).send("Not Found");
    }
    //check if the same id user is deleting
    if(notes.user.toString()!==req.user.id){
        res.status(401).send("Not Authorized");
    }
    else{
        //same user is deleting then delete
        notes=await Notes.findByIdAndDelete(req.params.id);
        res.json({success:"Note Deleted"})

    }
}
catch(err){
    res.status(500).send("Internal Server Error")
}
})
module.exports=router