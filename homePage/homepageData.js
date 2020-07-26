//引入模板

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//连接数据库
/*mongoose.connect(
  "mongodb://127.0.0.1:27017/mymusic",
    {
    useNewUrlParser:true,
      useUnifiedTopology:true
})
    .then(()=>{console.log('数据库连接成功');})
    .catch(()=>{console.log('数据库连接失败');})*/


//建立数据表规则
let homePageDataSchema = new Schema({
  officialPlaylist:[
    {
      id:{
        type:String,
        required: true
      },
      title:{
        type:String,
        required: true
      },
      cover:{
        type:String,
        required: true
      },
    }
  ],
  ugcPlaylist:[
    {
      id:{
        type:String,
        required: true
      },
      title:{
        type:String,
        required: true
      },
      cover:{
        type:String,
        required: true
      },
    }
  ],
  zoneList:[
    {
      id:{
        type:String,
        required: true
      },
      title:{
        type:String,
        required: true
      },
      cover:{
        type:String,
        required: true
      },
    }
  ],
  hotList:[{
    cover_pic_url:{},
    id:{},
    title:{},
    description:{},
    score:{},
  }]
})
//创建数据表
let homePageData = mongoose.model('homePageData',homePageDataSchema)
//导出数据表
module.exports = homePageData