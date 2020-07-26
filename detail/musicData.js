const mongoose = require("mongoose")
const Schema = mongoose.Schema
/*mongoose.connect("mongodb://127.0.0.1:27017/mymusic",{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{console.log("数据库连接成功");}).catch((err)=>{console.log("数据库连接失败");throw err})*/

let musicSchema = new Schema({
  taogeData:{
    id:{},
    picurl:{},
    songlist:[{
      singer:{},
      name:{},
      album:{},
      mid:{}
      },
    ]
  }
})

let musicData = mongoose.model("musicData",musicSchema)
module.exports = musicData