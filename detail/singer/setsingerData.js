const mongoose = require("mongoose")
const Schema = mongoose.Schema

/*mongoose.connect("mongodb://127.0.0.1:27017/mymusic",{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{console.log("数据库连接成功");}).catch((err)=>{console.log("数据库连接失败");throw err})*/

let singerSchema = new Schema({
  "singer_id":String,
  "singer_mid":String,
  "singer_name":String,
  "singer_pic":String,
})

let singerData = mongoose.model("singerData",singerSchema)

module.exports = singerData