//引入模板
const request = require("request")
const fs = require("fs")
const {JSDOM} = require("jsdom")
const homePageData = require('./homepageData')

//爬取数据
request({
  url:"https://i.y.qq.com/n2/m/index.html"

},(err,res,body)=> {
 // homePageData.deleteMany({})
  let dom = new JSDOM(body, {runScripts: "dangerously"})
  let songlist =JSON.stringify(dom.window.__INIT_DATA__)
  let data = JSON.parse(songlist)
  //console.log(data);
  /*fs.writeFile(`${__dirname}/sss.json`,songlist,{encoding:"utf8"},(err)=>{
    if(err){throw err}
    console.log("写入成功");
  })*/
  let officialPlaylist = data.homeData.officialPlaylist
  let ugcPlaylist = data.homeData.ugcPlaylist
  let zoneList = data.homeData.zoneList
  let hotList = data.homeData.hotList
  let arr = []
  let Arry = []
  let Arrry=[]
  let arrrry=[]
  //console.log(officialPlaylist);
  officialPlaylist.forEach(item =>{
    arr.push({
      id:item.id,
      title:item.title,
      cover:item.cover,
    })
  })
  ugcPlaylist.forEach(item =>{
    Arry.push({
      id:item.id,
      title:item.title,
      cover:item.cover,
    })
  })
  zoneList.forEach(item =>{
    Arrry.push({
        id:item.id,
      title:item.title,
      cover:item.cover,
    })
  })
  hotList.forEach(item =>{
    arrrry.push({
      cover_pic_url:item.cover_pic_url,
      id:item.hotkey_id,
      title:item.title,
      description:item.description,
      score:item.score
    })
  })

  homePageData.create({
    officialPlaylist:arr,
    ugcPlaylist:Arry,
    zoneList:Arrry,
    hotList:arrrry,
  })
      .then(() => {
        console.log('插入数据库成功');
      })
      .catch((err) => {
        console.log('插入数据库失败');
        throw err
      })
})