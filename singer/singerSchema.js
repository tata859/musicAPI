const mongoose = require("mongoose");
const Shema = mongoose.Schema

/*mongoose.connect("mongodb://127.0.0.1:27017/mymusic",{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("数据库连接成功");
}).catch(()=>{
  console.log("数据库连接失败");
})*/

const singerSchma = new Shema({
  singerlist:[
    {
      name:{
        type:String,
        required: true
      },
      mid:{
        type:String,
        required: true
      },
      pic:{
        type:String,
        required: true
      },
    }
  ]
})

let singerData = mongoose.model("singerData",singerSchma)

module.exports = singerData