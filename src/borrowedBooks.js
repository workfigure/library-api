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
var idArray = getBookIds(idObject);
function getBorrowedBookList(){ 
    var borrowedBookList = [];
    for (var i = 0; i < idArray.length; i++){
        borrowedBookList.push (book.getBookById (idArray[i]));
    }
    return borrowedBookList;
}

 
// module.exports is an object that the current module returns when it is "required" in another program or module.
// it is like package 
module.exports = {
    //getBookIds: getBookIds, // you can assign any variable as key 
    getBorrowedBookList: getBorrowedBookList
};