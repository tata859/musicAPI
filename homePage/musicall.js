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
let musicallSchema = new Schema({
  songid:{},
  songmid:{},
  songname:{},
  songtitle:{},
  singerid:{},
  singername:{},
  singermid:{},
})
//创建数据表
let musicall = mongoose.model('musicall',musicallSchema)
//导出数据表
module.exports = musicall