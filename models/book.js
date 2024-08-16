const mongoose =require('mongoose');
const Author=require('../models/author');
const bookSchema=new mongoose.Schema({
    bookname:String,
    authorname:String, 
    authorId:{type:mongoose. Schema.Types.ObjectId, ref: 'Author' },
    price:Number,
    rating:Number

});
const Book=mongoose.model('Book',bookSchema);
module.exports=Book;