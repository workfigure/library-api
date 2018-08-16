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
            booksByAuthor.push(bookDetail[i].title);
        }

    }
    if (booksByAuthor.length == 0){
        return "The author ID provided is not in the file.";
    }
    else{
        return booksByAuthor.sort().toString();
    }
    
}
 
// module.exports is an object that the current module returns when it is "required" in another program or module.
// it is like package 
module.exports = {
    searchBookByAuthorID: searchBookByAuthorID
};