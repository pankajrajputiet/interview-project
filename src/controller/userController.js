const express = require("express");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const User = require("./../model/userModel")
const mongoose = require("mongoose");
const config = require("./../config/config");

// connection to database
mongoose.connect(config.DB_URL,()=>{
    config.logger.info("connected to DB")
})

// to create new user
userRouter.post("/createUser",async(req,res)=>{
    try{
        let createUser =  new User(req.body)
        let result = await createUser.save();
        res.send(result)
    }catch(e){
        res.status(400).send(e)
    }
   
})

//to update user information
userRouter.put("/updateUser/:id",async(req,res)=>{
    try{
        const _id = req.params.id;
        const updateUser = await User.findOneAndUpdate(_id,req.body);
       
        res.send(updateUser)
    }catch(e){
        res.status(400).send(e);
    }
})

// find all user list
userRouter.get("/findUsers",async(req,res)=>{
    try{
        const findUsers = await User.find()
        res.send(findUsers)
    }catch(e){
        res.status(500).send(e)
    }
    
})


// to delete user
userRouter.delete("/deleteUser/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
   
        res.send(deleteUser)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports =userRouter;