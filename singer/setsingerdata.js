const request = require("request")
const singerSchema = require("./singerSchema")
//const {JSDOM} = require("jsdom")
//const fs = require("fs")
//const path = require("path")



request({
  url:"https://u.y.qq.com/cgi-bin/musics.fcg",
  qs:{
      "-": "getUCGI27368619398572314",
      "g_tk": "5381",
      "sign": "zza9fbxo5xudyd6h2f3fef04bda3a286eeb40136f6b80f4a",
      "loginUin": "0",
      "hostUin": "0",
      "format": "json",
      "inCharset": "utf8",
      "outCharset": "utf-8",
      "notice":"0",
      "platform": "yqq.json",
      "needNewCode": "0",
      "data": '{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
  },
  "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
},(err,res,body)=>{
  //console.log(body);
  let bodys = JSON.parse(body)
  /*fs.writeFile(path.join(__dirname,"singerData.json"),body,(err)=>{
    if(err) throw err
    console.log("写入成功");
  })*/
  //let dom = new JSOM(body,{runScripts:"dangerously"})
  let singerList = bodys.singerList.data.singerlist
  let singerArry = []
  singerList.forEach(item => {
    singerArry.push({
      name:item.singer_name,
      mid:item.singer_mid,
      pic:item.singer_pic
    })
  })
  console.log(singerArry);
  singerSchema.create({
    singerlist:singerArry
  }).then(()=>{
    console.log("插入成功");
  }).catch(()=>{

  })
})
