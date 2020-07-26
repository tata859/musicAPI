
const request = require("request")
const {JSDOM} = require("jsdom")
const fs = require("fs")
const path = require("path")



request({
  method:"GET",
  url:"https://i.y.qq.com/v8/playsong.html?songmid=001zhxVn0sqZ45",
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
  console.log(songData);
})


