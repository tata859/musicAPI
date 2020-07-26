const mongoose = require("mongoose")
const Shema = mongoose.Schema

let pageShema = new Shema({
  id:{},
  picurl:{},
  songlist:[
    {
      name:{},
      mid:{},
      singer:{},
    }
  ]
})

let pagesongData = mongoose.model("pagesongData",pageShema)
module.exports = pagesongData;