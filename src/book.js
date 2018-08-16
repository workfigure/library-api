const fs = require('fs'); //like import 

//1. Read data from json file (contains array type)
let rawdata = fs.readFileSync('./src/data/books.json');  
let books = JSON.parse(rawdata);  //returns js arrays

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

function getbookSearchByTitle(title){
    var detailbook = [];
    var j;
    for(var i = 0; i < books.length; i++){
        //if(books[i].title == title){ to check all the title name
            if(books[i].title.includes(title) == true){
            detailbook[i] = books[i]; 
        }
    }
    return detailbook;
}
 
// module.exports is an object that the current module returns when it is "required" in another program or module.
// it is like package 
module.exports = {
    getBookList: getBookList, // you can assign any variable as key 
    getBookById: getBookById,
    getbookSearchByTitle: getbookSearchByTitle
};