const { updateBook } = require('../controller/userController');
const Author=require('../models/author');
const Book=require('../models/book');
async function addBookData(data){
    //check the book is  already exist
    const bookid=await Book.find({"bookname":data.bookname},{ _id: 1 });
    //if the book is already exist
    if (bookid.length>0){
        const information="The book is already exist ,can you try to change any data please go to the update branch";
        return information;
    }
    //if the book is newly created
    else{
        //check the author already exist
        const authorId=await Author.find({"authorname":data.authorname},{_id:1});
        //if the author is already exist
        if(authorId.length>0){
            const book=new Book(data);
            const bookDetails=await book.save();
            const authorUpdate=await Author.updateOne({"authorname":data.authorname},{$push:{"bookID":bookDetails._id}});
            const onlyAuthorId=await Author.findOne({"authorname":data.authorname});

            const bookUpdate=await Book.updateMany({"bookname":data.bookname},{$set:{"authorId":onlyAuthorId._id}});
            const idUpdatedBook=await Book.findOne({"bookname":data.bookname});
            return idUpdatedBook;
        }
      //if the author is newly created
        else{
            const book=new Book(data);
            const bookDetails=await book.save();
            const author=new Author({"authorname":data.authorname});
            const authorDetails=await author.save();
            const authorUpdate=await Author.updateMany({"authorname":data.authorname},{$push:{"bookID":bookDetails._id}});
            const bookUpdate=await Book.updateMany({"bookname":data.bookname},{$set:{"authorId":authorDetails._id}});
            const idUpdatedBook=await Book.find({"bookname":data.bookname});
            return idUpdatedBook;
            

        }
    }
    

}
async function updateBookData(data){
    //check the book is  already exist
    const bookid=await Book.find({"bookname":data.bookname},{ _id: 1 });
    //if the book is didnot exist
    if (bookid.length<0){
        const notification="your book didnt exist please goto the add branch";
        return notification;   
    }
    else{
        //check the author already exist
        const authorId=await Author.find({"authorname":data.authorname},{_id:1});
        //if the author is already exist
        if(authorId.length>0){
            const onlyAuthor=await Author.findOne({"authorname":data.authorname});
            const bookDetails=await Book.find({"bookname":data.bookname});
            const bookIds = bookDetails.map(book => book._id);
          


            //update
            const authorUpdate=await Author.updateMany({"authorname":data.authorname},{$push:{"bookID":bookIds}});

            const bookUpdate=await Book.updateMany({"bookname":data.bookname},{$set:{"authorId":onlyAuthorId._id}});
            const bookUpdate1=await Book.updateMany({"bookname":data.bookname},{$set:{"authorname":data.authorname}});
            const bookUpdate2=await Book.updateMany({"bookname":data.bookname},{$set:{"price":data.price}});
            const bookUpdate3=await Book.updateMany({"bookname":data.bookname},{$set:{"rating":data.rating}});

            const idUpdatedBook=await Book.findOne({"bookname":data.bookname});
            return idUpdatedBook;
        }
        //if the author is newly created
        else{
            const author=new Author({"authorname":data.authorname});
            const authorDetails=await author.save();
            console.log(data.authorname);
            const bookDetails=await Book.find({"bookname":data.bookname});
            const bookIds = bookDetails.map(book => book._id);
            const authorUpdate=await Author.updateMany({"authorname":data.authorname},{$push:{"bookID":bookIds}});
            const bookUpdate5=await Book.updateMany({"bookname":data.bookname},{$set:{"authorId":authorDetails._id}});
            const bookUpdate=await Book.updateMany({"bookname":data.bookname},{$set:{"authorname":data.authorname}});
            const bookUpdate2=await Book.updateMany({"bookname":data.bookname},{$set:{"price":data.price}});
            const bookUpdate3=await Book.updateMany({"bookname":data.bookname},{$set:{"rating":data.rating}});
            const idUpdatedBook=await Book.find({"bookname":data.bookname});
            return idUpdatedBook;
        }    

    }

}
async function authorsBook(data) {
    const authorId=data._id;
    const authorsBookDetail=await Author.findById(authorId).populate('bookID');
    return authorsBookDetail;
    
}
async function bookAuthor(data) {
    const bookId=data._id;
    const bookAuthorDetail=await Book.findById(bookId);
    return bookAuthorDetail ;
    
}


module.exports={addBookData,updateBookData,authorsBook,bookAuthor};