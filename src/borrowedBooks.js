const fs = require('fs'); //like import 
const book = require('./book');

//1. Read data from json file (contains array type)
let rawdata = fs.readFileSync('./src/data/borrows.json');  
let idObject = JSON.parse(rawdata);  //returns js arrays


//returns list book ids 
function getBookIds(idObject){
    var bookIds=[]; 

    for(var i = 0; i < idObject.length; i++){
        let booksBorrowed = idObject[i].booksBorrowed; 
        for(var j = 0; j < booksBorrowed.length; j++){
            bookIds.push(booksBorrowed[j]);
        }
    }

    if(idObject.length == 0){  
        return {message: 'There is not borrowed books yet.'};
    }
    return bookIds;
}
function getBorrowedBookList(){
    var listOfBookID = getBookIds(idObject);
    var borrowedBookList = [];
    for (var i = 0; i < listOfBookID.length; i++){
        borrowedBookList.push (book.getBookById (listOfBookID[i]));
    }
    return borrowedBookList;
}
 
module.exports = {
    getBorrowedBookList: getBorrowedBookList
};