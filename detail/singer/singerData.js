const request = require("request")
//const musicData = require("./musicData")
const {JSDOM} = require("jsdom")
const fs = require("fs")
const path = require("path")



request({
  method:"POST",
  url:"https://u.y.qq.com/cgi-bin/musics.fcg",

  /*url:"https://i.y.qq.com/n2/m/share/details/taoge.html",*/
  qs:{
    sign: "zza89jo5f166qwz5asa2fe347fd46adb99b5f6be6602b6f7e8b",
    _: "1593780527746",
    data:'{"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"4015821387","songmid":["001zhxVn0sqZ45","002hiera1sGEd8","003dZWGW0pUQzr","001hvxXw0szQOD","0015olDc21xsnn","0013dwk51wDqZJ","004B0RaB3vJmI6","0041teYi4CyZ2Q","003bEjmk0wO7ZS","002esgaM4Bi0wp","0032bsum4BkVom","0022BPS72L2XMQ","0028aIbR2cZP7F","003DrFPE0HFrHd","0037tdR42hYhcm","000JOsV11UTA5Y","000iDpGB4NlS0D","001D4Wg91jKI1c","000BiCA30oX60t","000t8Gij1VgwjM","002qyr7F1Flgjr","000k1XBL418ihA","002KerBw09VHia"],"songtype":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"uin":"0","loginflag":0,"platform":"23","h5to":"speed"}},"req_1":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"4015821387","songmid":["002q83Sd2G7Y7D","000bz9Nw30VQAr","004XUby13QTpcD","004ROXd12jg14h","003A30AL4PmrMx","002kPPGI3zDlOt","004eNpuy2fbaOI"],"songtype":[0,0,0,0,0,0,0],"filename":["RS02002q83Sd2G7Y7D.mp3","RS02004VVjpT1D7cZD.mp3","RS02000zV2Vm0c2dqo.mp3","RS02002NzhMZ1DWWUu.mp3","RS02003tLKfv0fmiEo.mp3","RS02000RrkxE1aLc21.mp3","RS020032oyE71qTKyy.mp3"],"uin":"0","loginflag":0,"platform":"23","h5to":"speed"}},"comm":{"g_tk":1150050101,"uin":0,"format":"json","platform":"h5"}}'
  },
  headers:{
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  }
},(err,res,body)=>{
  console.log(body);
   //let dom = new JSDOM(body,{runScripts:"dangerously"})
  // let singerList =JSON.stringify(dom.window.firstPageData)
  //let taogeData = singerList.taogeData
  /*let id = taogeData.id
  let picurl = taogeData.picurl
  let songlist = taogeData.songlist*/
  //console.log(singerList);
 /* fs.writeFile(path.join(__dirname,"vkey.json"),singerList,(err)=>{
    if(err) throw err
    console.log("写入成功");
  })*/
  /*let singerArry = []
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
  })*/
})