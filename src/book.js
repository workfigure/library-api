const fs = require('fs'); //like import 

//1. Read data from json file (contains array type)
let rawdata = fs.readFileSync('./src/data/books.json');  
let books = JSON.parse(rawdata);  //returns js array

//returns list of books 
function getBookList(){
    return books;
}
// 3 ways to define the function 
/*
var getBookById = function(bookId){

};
*/
/*
var getBookById = (bookId)=>{

}
*/
//returns a book with the given id 
function getBookById(bookId){
    var book; // should be initialized?

    for(var i=0; i< books.length; i++){
        if(books[i].id == bookId){
            book = books[i];
        }
    }

    if(!book){  
        return {message: 'There is not book for the requested book id.'};
    }
    return book;
}


//search books by author ID 
function searchBookByAuthorID(AuthorID){
    var booksByAuthor = [];
    for(var i = 0; i < books.length; i++){
        if (AuthorID == books[i].author.id){
            booksByAuthor.push(books[i]);
        }

    }
    if (booksByAuthor.length == 0){
        return "The author ID provided is not in the file.";
    }
    else{
        return booksByAuthor;
    }
    
}
 
module.exports = {
    searchBookByAuthorID: searchBookByAuthorID
};


//search books by keyword 
function searchBookByKeyWord(keyWord){
    var listOfBooks = [];
    for(var i = 0; i < books.length; i++){
        if (books[i].title.search(keyWord) != -1 || books[i].description.search(keyWord) != -1){
            listOfBooks.push(books[i]);
        }

    }
    if (listOfBooks.length == 0){
        return "There is no books associated with this key word.";
    }
    else{
        return listOfBooks;
    }
    
}
 
 
 
module.exports = {
    getBookList: getBookList,  
    getBookById: getBookById,
    searchBookByAuthorID: searchBookByAuthorID,
    searchBookByKeyWord: searchBookByKeyWord
};