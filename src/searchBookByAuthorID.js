const fs = require('fs'); //like import 
//const book = require('./book');

//1. Read data from json file (contains array type)
let rawdata = fs.readFileSync('./src/data/books.json');  
let bookDetail = JSON.parse(rawdata);  //returns js arrays


//returns list book ids 
function searchBookByAuthorID(AuthorID){
    var booksByAuthor = [];
    for(var i = 0; i < bookDetail.length; i++){
        if (AuthorID == bookDetail[i].author.id){
            booksByAuthor.push(bookDetail[i]);
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