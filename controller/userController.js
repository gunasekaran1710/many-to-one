const repository=require('../repository/userRepository');
async function addBookData(req,res){
    try{
        bookData=await repository.addBookData(req.body);
        res.status(201).json(bookData);
    }
    catch(err){
        res.status(400).json("error");
    }
}
async function updateBook(req,res){
    try{
        bookData=await repository.updateBookData(req.body);
        res.status(201).json(bookData);
    }
    catch(err){
        res.status(400).json("plsease give correct data,the book was not updated");
    }
}
async function authorsBook(req,res){
    try{
        bookData=await repository.authorsBook(req.body);
        res.status(201).json(bookData);
    }
    catch(err){
        res.status(400).json("error");
    }
    
}async function bookAuthor(req,res){
    try{
        bookData=await repository.bookAuthor(req.body);
        res.status(201).json(bookData);
    }
    catch(err){
        res.status(400).json("error");
    }
    
}

module.exports={addBookData,updateBook,authorsBook,bookAuthor};