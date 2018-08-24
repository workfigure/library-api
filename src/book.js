const fs = require('fs'); //like import 

//1. Read data from json file (contains array type)
const bookDataPath = './src/data/books.json';

   //1. Read data from json file (contains array type)
let bookRawdata =fs.readFileSync(bookDataPath);
let books = JSON.parse(bookRawdata);



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

function saveBook(book){
    let exist = false; // flage

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
            message: 'The book is already exist.'
        };

    }
    
    book.id = uuidv1();
    books.push(book);
    fs.writeFileSync(bookDataPath, JSON.stringify(books));

    return {
        message: 'The books is added successfuly.'
    }; 
}
 
// module.exports is an object that the current module returns when it is "required" in another program or module.
// it is like package 
module.exports = {
    getBookList: getBookList, // you can assign any variable as key 
    getBookById: getBookById,
    getbookSearchByTitle: getbookSearchByTitle,
    saveBook: saveBook
};