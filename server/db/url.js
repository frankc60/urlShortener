const db = require("./index");

const mongoose = require('mongoose');



const urlSchema = mongoose.Schema({
  longUrl: String,
  shortUrl:  String,
  created: { type: Date, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);


  module.exports = Url;