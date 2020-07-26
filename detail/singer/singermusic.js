const mongoose = require("mongoose")
const Schema = mongoose.Schema

let singermusicSchema = new Schema({
  backgroundImage:{},
  singer_mid:{},
  singer_name:{},
  singer_songlist:[]
})

let singermusic = mongoose.model("singermusic",singermusicSchema)

module.exports = singermusic



