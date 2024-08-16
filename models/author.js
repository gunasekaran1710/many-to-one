const mongoose =require('mongoose');
const Book=require('../models/book');
const authorSchema=new mongoose.Schema({
    authorname:String,
    bookID:[{type:mongoose. Schema.Types.ObjectId, ref: 'Book'}]
});
const Author=mongoose.model('Author',authorSchema);
module.exports=Author;