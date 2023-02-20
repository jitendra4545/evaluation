const express=require('express')
const app=express()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors=require('cors')

app.use(cors())
const { UserModel } = require('../model/userModel');
app.use(express.json())
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    //console.log(req.body)
    let {name,email,gender,password,age,city}=req.body
    try{
  


        bcrypt.hash(password, 7, async(err, hash)=> {
           if(err){
            res.send('failed')
           }else{
            let newData=new UserModel({name,email,gender,password:hash,age,city})
            await newData.save()
            res.send(newData)
           }
        });
    }catch(err){
         res.send('error in first go')
    }
})

userRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
      let data= await UserModel.find({email})
       if(data.length>0){
        bcrypt.compare(password, data[0].password, (err, result)=> {
            if(result){
                let token = jwt.sign({ foo: 'bar' }, 'masai');
                res.send(token)
            }
        });
       }else{
        res.send('enter right data')
       }

    }catch(err){
res.send(err)
    }
})


module.exports={
    userRouter
}