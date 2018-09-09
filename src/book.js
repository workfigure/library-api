const fs = require('fs'); //like import 
const readfile = require('./helper/readfile');
const uuidv1 = require('uuid/v1');

//1. Read data from json file (contains array type)
const bookDataPath = './src/data/books.json';
var books = [];

//returns list of books 
function getBookList(){
    books = readfile.getData(bookDataPath);
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
//Returns a book with the given id 
function getBookById(bookId){
    books = readfile.getData(bookDataPath);
    var book; 

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
    books = readfile.getData(bookDataPath);
    var booksByAuthor = [];
    for(var i = 0; i < books.length; i++){
        if (AuthorID == books[i].author.id){
            booksByAuthor.push(books[i]);
        }

    }
    if (booksByAuthor.length == 0){
        return "Empty file or there is no book associated with provided author ID.";
    }
    else{
        return booksByAuthor;
    }
    
}

//search books by keyword 
function searchBookByKeyWord(keyWord){
    books = readfile.getData(bookDataPath);
    var listOfBooks = [];
    for(var i = 0; i < books.length; i++){
        if (books[i].title.search(keyWord) != -1 || books[i].description.search(keyWord) != -1){
            listOfBooks.push(books[i]);
        }

    }
    if (listOfBooks.length == 0){
        return "There is no books associated with the keyword.";
    }
    else{
        return listOfBooks;
    }
    
}
 
function getbookSearchByTitle(title){
    books = readfile.getData(bookDataPath);
    var detailbook = [];
    var j;
    for(var i = 0; i < books.length; i++){
            if(books[i].title.includes(title) == true){
            detailbook[i] = books[i]; 
        }
    }
    return detailbook;
}

function saveBook(book){
    books = readfile.getData(bookDataPath);
    if (book == null || book == {} || !book || typeof book !== 'object' || !book.ISBN){
        return {
            message: 'The data should be object and have the required book fields.'
        };

    }
    
    let exist = false; // flag

    //Validate the user is already exist or not.
    for(let i=0; i< books.length; i++){
        if(books[i].ISBN == book.ISBN){
            exist = true;
            books[i].quantity++;
            fs.writeFileSync(bookDataPath, JSON.stringify(books));
        }
    }
 
    if(exist == true){
        return {
            message: 'The book already exists.'
        };

    }
    
    book.id = uuidv1();
    books.push(book);
    fs.writeFileSync(bookDataPath, JSON.stringify(books));
    
    return {
        message: 'The book is added successfuly.'
    }; 
}
 
function searchBookStartWithTitleName(title){
    books = readfile.getData(bookDataPath);
    var detailbook = [];
    var j;
    for(var i = 0; i < books.length; i++){
            if(books[i].title.startsWith(title) == true){
            detailbook[i] = books[i];
        }
    }
    return detailbook;
}

function searchBookLastWithTitleName(title){
    books = readfile.getData(bookDataPath);
    var detailbook = [];
    var j;
    for(var i = 0; i < books.length; i++){
            if(books[i].title.endsWith(title) == true){
            detailbook.push(books[i]);
        }
    }
    return detailbook;
}
    

// module.exports is an object that the current module returns when it is "required" in another program or module.
// it is like package 
module.exports = {
    getBookList: getBookList,  
    getBookById: getBookById,
    getbookSearchByTitle: getbookSearchByTitle,
    saveBook: saveBook,
    searchBookStartWithTitleName: searchBookStartWithTitleName,
    searchBookLastWithTitleName: searchBookLastWithTitleName,
    searchBookByAuthorID: searchBookByAuthorID,
    searchBookByKeyWord: searchBookByKeyWord,
    getbookSearchByTitle: getbookSearchByTitle
};