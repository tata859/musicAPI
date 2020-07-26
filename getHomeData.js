const express = require("express");
const request = require("request")
const {JSDOM} = require("jsdom")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const homePageData = require('./homePage/homepageData')
const musicall = require('./homePage/musicall')
const singerdata = require("./singer/singerSchema")
const songdata = require("./detail/songdetail/songSchema")
const pageShema = require("./homePage/homepageDetail/pageShema")
const singermusic = require("./detail/singer/singermusic")
const rankingData = require("./ranking/rankingData")
let app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(5555,()=>{
  console.log('服务已启动');
})

mongoose.connect(
    "mongodb://127.0.0.1:27017/mymusic",
    {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    .then(()=>{console.log('数据库连接成功');})
    .catch(()=>{console.log('数据库连接失败');})
//允许跨域
/*app.all('*',(req,res,next)=>{
  res.set('Access-Control-Allow-Origin','*')
  next()
})*/
app.use("*",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token")
  next()
})
//musicHall页面接口
app.get('/api',(req,res)=>{
  homePageData.find({},{
    _id:false,
    _v:false
  }).then((data)=>{
    if(data.length){
      res.json(data)
    }else {
      request({
        url:"https://i.y.qq.com/n2/m/index.html"
      }
      ,(err,res,body)=> {
        // homePageData.deleteMany({})
        let dom = new JSDOM(body, {runScripts: "dangerously"})
        let songlist =JSON.stringify(dom.window.__INIT_DATA__)
        let data = JSON.parse(songlist)
        //处理数据
        let officialPlaylist = data.homeData.officialPlaylist
        let ugcPlaylist = data.homeData.ugcPlaylist
        let zoneList = data.homeData.zoneList
        let hotList = data.homeData.hotList
        let arr = []
        let Arry = []
        let Arrry=[]
        let arrrry=[]
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
        //写入数据库
        homePageData.create({
          officialPlaylist:arr,
          ugcPlaylist:Arry,
          zoneList:Arrry,
          hotList:arrrry,
        })
            .then((data) => {
              console.log('插入数据库成功');
              homePageData.find({},{
                _id:false,
                _v:false
              }).then((data)=>{res.json(data)})
            })
            .catch((err) => {
              console.log('插入数据库失败');
              throw err
            })
      })

    }

  }).catch((err)=>{throw err})
})
//page页面歌单
app.get("/api/pagesong",(req,res)=>{
  let id = req.query.id
  pageShema.find({"id":id},{
    _id:false,
    _v:false
  })
    .then((data)=>{
      if(data.length){
        res.json(data)
      }else {
        request({
          method: "GET",
          url:"https://i.y.qq.com/n2/m/share/details/taoge.html?ADTAG=myqq&from=myqq&channel=10007100&id=" + `${id}`,
          headers:{
            "user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
          }
        },(err,response,body)=>{
          let dom = new JSDOM(body, {runScripts:"dangerously"});
          let pagedata =dom.window.firstPageData.taogeData
          let picurl = pagedata.picurl
          console.log(picurl);
          let songlist = []
          pagedata.songlist.forEach(item=>{
            if(item.pay.pay_play!=1){
              songlist.push({
                name:item.name,
                mid:item.mid,
                singer:item.singer[0],
              })
            }
          })
          pageShema.create({
            id,
            picurl,
            songlist
          }).then((data)=>{
            console.log("写入数据库成功");
            pageShema.find({"id":id})
                .then((data)=> {
                  if (data.length) {
                    res.json(data)
                  }
                })
          })
              .catch((err)=>{
                throw err
                console.log("写入数据库失败");
              })
        })
      }
    })
      .catch((err)=>{
        throw err
      })

})
//singerList歌手列表接口
app.get('/singerlist',(req,res)=>{

  singerdata.find({},{
    _id:false,
    _v:false
  }).then((data)=>{
    res.json(data[0])


  }).catch((err)=>{throw err})
})
//排行页面接口
app.get('/rankinglist',(req,res)=>{

  rankingData.find({},{
    _id:false,
    _v:false
  }).then((data)=>{
    res.json(data[0])
  }).catch((err)=>{throw err})
})
//歌手的所有歌曲接口
app.get('/music/singer',(req,res)=>{
  //console.log(req.query);
  singermusic.find({singer_mid:req.query.singermid},{
    _id:false,
    _v:false
  }).then((data)=>{

    if(data.length){
      //console.log(data);
      res.json(data)
    }
    else{
      //console.log(22);
      request({
            url:"https://i.y.qq.com/n2/m/share/profile_v2/index.html?ADTAG=newyqq.singer&source=ydetail&singermid=" + `${req.query.singermid}`,
            headers:{
              "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
            }
          },
          (err,response,body)=>{
            let dom = new JSDOM(body,{runScripts:"dangerously"})
            let singerList =dom.window.firstPageData
            let arry=[]
            singerList.tabData.song.list.forEach(item=>{
              arry.push({
                id:item.id,
                mid:item.mid,
                name:item.name,
                title:item.title,
                singer:item.singer
              })
            })
            singermusic.create({
              singer_name:singerList.data.name,
              singer_mid:req.query.singermid,
              backgroundImage:singerList.data.backgroundImage,
              singer_songlist:arry
            })
                .then((data)=>{
                  console.log("写入数据库成功");
                  singermusic.find({singer_mid:req.query.singermid},{
                    _id:false,
                    _v:false
                  }).then((data)=>{res.json(data)})
                      .catch()
                })
                .catch((err)=>{
                  console.log("写入数据库失败");
                  throw err
                })
          })
    }
  }).catch((err)=>{throw err})
})
//单个歌曲接口
app.get('/music/song/',(req,res)=>{
  let songmid = req.query.singermid
  console.log(songmid);
  songdata.find({"songData.songMid":songmid},{
    _id:false,
    _v:false
  }).then((data)=>{
    if(data.length){
      //console.log(data);
      res.json(data)
    }
    else{
      //console.log(22);
      request({
        method:"GET",
        url:"https://i.y.qq.com/v8/playsong.html?songmid=" + `${songmid}`,
        headers:{
          "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1"
        }
          }, (err,response,body)=>{
            let dom = new JSDOM(body,{runScripts:"dangerously"})
            let songLists =dom.window.songlist
        //console.log(songLists);
        let songList = songLists[0]
        //console.log(songLists);
            let songData={
              songpic: songList.pic,
              songMid : songList.songmid,
              m4aUrl : songList.m4aUrl,
              songName : songList.songname,
              singer : songList.singer,
              playTime : songList.playTime,
            }
        //console.log(songData);
            songdata.create({
              songData
            })
                .then((data)=>{
                  console.log("写入数据库成功");
                  songdata.find({"songData.songMid":songmid},{
                    _id:false,
                    _v:false
                  }).then((data)=>{res.json(data)})
                      .catch()
                })
                .catch((err)=>{
                  console.log("写入数据库失败");
                  throw err
                })
          })
    }
  }).catch((err)=>{throw err})

})
//搜索接口
app.get('/seach',(req,res)=>{
  let keyword = req.query.searchkey
  console.log(keyword);
  let i="i";
  let code= {
    $or:[
      {songname:new RegExp(keyword,i)},
      {singername:new RegExp(keyword,i)}
    ]
  }

  musicall.find(code,{
    _v:false,
    _id:false
  }).then((data)=>{
    console.log(data);
    if(data){res.json(data)}
    else {res.json("暂时无数据")}
  })
      .catch((err)=>{throw err})
})
//登录注册
app.post("/register",(req,res)=>{
  console.log(req.body);
  console.log(req.body.name);
  if(req.body.name!==""){
    user.find({
      username:req.body.name
    }).then(data=>{
      if(data.length==1){
        console.log(data);
        res.json({
          code:0,
          data:data,
          msg:"用户名已存在，请直接登录"
        })
      }else {
        user.create({
          username:req.body.name,
          passworld:req.body.passworld,
          Email:req.body.Email,
        }).then(()=>{
          res.json({
            code:1,
            msg:"注册成功"
          })
        }).catch((err)=>{
          throw err
        })
      }

    }).catch((err)=>{
      throw err
    })
  }else {
    res.send({
      code:0,
      msg:"用户不能为空"
    })
  }
})
app.post("/login",(req,res)=>{
  console.log(req.query);
})
