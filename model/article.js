'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema
var ArticlesSchema = new Schema({
  title:String,	
  author: String,
  content: String,
  comment:{
    type : Array,
    }
});

//export our module to use in server.js
module.exports = mongoose.model('Articles', ArticlesSchema);
