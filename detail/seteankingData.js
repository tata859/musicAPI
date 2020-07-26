const request = require("request")
const musicData = require("./musicData")
const {JSDOM} = require("jsdom")
const fs = require("fs")
const path = require("path")

request({
  url:"https://i.y.qq.com/n2/m/share/details/taoge.html",
  qs:{
    "ADTAG": "myqq",
    "from": "myqq",
    "channel": "10007100",
    "id": "7256912512",
  },
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
},(err,res,body)=>{

  let dom = new JSDOM(body,{runScripts:"dangerously"})
  let singerList =dom.window.firstPageData
  let taogeData = singerList.taogeData
  let id = taogeData.id
  let picurl = taogeData.picurl
  let songlist = taogeData.songlist
  console.log(taogeData);
  let singerArry = []
  songlist.forEach(item => {
     singerArry.push({
       singer:item.singer,
       name:item.name,
       album:item.album,
       mid:item.mid
     })
   })
   console.log(singerArry);
  musicData.create({
    taogeData:{
      id:taogeData.id,
      picurl:taogeData.picurl,
      songlist:singerArry
    }
   }).then(()=>{
     console.log("插入成功");
   }).catch((err)=>{
     throw err
     console.log("插入失败");
   })
})
