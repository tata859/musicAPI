const mongoose = require("mongoose")
const Schema = mongoose.Schema

let songSchema = new Schema({
    songData:{
      songpic:{},
      songMid:{},
      m4aUrl:{},
      songName:{},
      singer:{},
      playTime:{}
    }
})

let songData = mongoose.model("songData",songSchema)
module.exports = songData