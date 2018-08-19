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
//Returns a book with the given id 
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
 
function getbookSearchByTitle(title){
    var detailbook = [];
    var j;
    for(var i = 0; i < books.length; i++){
            if(books[i].title.includes(title) == true){
            detailbook[i] = books[i]; 
        }
    }
    return detailbook;
}

function searchBookStartWithTitleName(title){
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
    searchBookStartWithTitleName: searchBookStartWithTitleName,
    searchBookLastWithTitleName: searchBookLastWithTitleName
    searchBookByAuthorID: searchBookByAuthorID,
    searchBookByKeyWord: searchBookByKeyWord,
    getbookSearchByTitle: getbookSearchByTitle
};