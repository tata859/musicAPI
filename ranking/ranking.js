const request = require("request");
const {JSDOM} = require("jsdom");
const rankingData = require("./rankingData")
const fs = require("fs")

request({
  url:"https://i.y.qq.com/n2/m/index.html?tab=toplist",
  "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1"
},(err,res,body)=>{
  let dom = new JSDOM(body,{runScripts:"dangerously"})
  let fisionSong =dom.window.__INIT_DATA__
  let rinking =fisionSong.topListData.list
  let Arry = []
  rinking.forEach(item =>{
    Arry.push({
      groupName:item.groupName,
      toplist:item.toplist
    })
  })
  console.log(rinking);
  rankingData.create({
    rankingDatas:rinking
  }).then(()=>{
    console.log('数据库插入成功');
  }).catch((err)=>{
    throw err
    console.log('数据库插入失败');
  })
})