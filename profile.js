
const express = require("express");
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const user = require("./user/user")
mongoose.connect('mongodb://127.0.0.1:27017/mymusic',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let app=express()

app.use("*",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token")
  next()
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(5556,()=>{
  console.log('服务已启动');
})


app.post("/register",(req,res)=>{
  console.log(req.body);
  console.log(req.body.name);
  if(req.body.name!==""){
    user.find({
      username:req.body.name
    }).then(data=>{
      if(data.length==1){
        console.log(data);
        res.json({
          code:0,
          data:data,
          msg:"用户名已存在，请直接登录"
        })
      }else {
        user.create({
          username:req.body.name,
          passworld:req.body.passworld,
          Email:req.body.Email,
        }).then(()=>{
          res.json({
            code:1,
            msg:"注册成功"
          })
        }).catch((err)=>{
          throw err
        })
      }

    }).catch((err)=>{
      throw err
    })
  }else {
    res.send({
      code:0,
      msg:"用户不能为空"
    })
  }
})
app.post("/login",(req,res)=>{
  console.log(req.query);
})