const mongoose = require("mongoose")
const Schema = mongoose.Schema

let userSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  passworld:{
    type:String,
    required:true
  },
  Email:{}
})
let user = mongoose.model("user",userSchema)
module.exports = user