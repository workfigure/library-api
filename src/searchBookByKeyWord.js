const fs = require('fs'); //like import 
//const book = require('./book');

//1. Read data from json file (contains array type)
let rawdata = fs.readFileSync('./src/data/books.json');  
let bookDetail = JSON.parse(rawdata);  //returns js array


//returns list book ids 
function searchBookByKeyWord(keyWord){
    var listOfBooks = [];
    for(var i = 0; i < bookDetail.length; i++){
        if (bookDetail[i].title.search(keyWord) != -1 || bookDetail[i].description.search(keyWord) != -1){
            listOfBooks.push(bookDetail[i]);
        }

    }
    if (listOfBooks.length == 0){
        return "There is no books associated with this keyword.";
    }
    else{
        return listOfBooks;
    }
    
}
 
module.exports = {
    searchBookByKeyWord: searchBookByKeyWord
};