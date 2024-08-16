const express=require('express');
const controller =require('../controller/userController');
router=express.Router();
router.post('/add',controller.addBookData);
router.post('/updateBook',controller.updateBook);
router.get('/authorsbook',controller.authorsBook);
router.get('/bookauthor',controller.bookAuthor);

module.exports=router;