
const readfile = require('./helper/readfile');

let borrow = readfile.getData('./src/data/borrow.json');  
let books = readfile.getData('./src/data/books.json');

function getBorrowedBookList(){
    var listOfBookID = getBookIds(idObject);
    var borrowedBookList = [];
    for (var i = 0; i < listOfBookID.length; i++){
        borrowedBookList.push (book.getBookById (listOfBookID[i]));
    }
    return borrowedBookList;
}
 

function getborrowByID(userID){
    var book = [];
    for(var i=0; i < borrow.length; i++){
        if(borrow[i].userid == userID){
            //console.log(borrow[i].books.length);
            for(var j = 0; j < borrow[i].books.length; j++){
                for(var k = 0 ; k < books.length; k++){
                    if( borrow[i].books[j] == books[k].id){
                        //console.log(books[k]);
                        book[j] = books[k];
                    }
                }
            }
        }
    }
    
    return book;
}


module.exports = {
    getborrowList: getborrowList,
    getborrowByID: getborrowByID
};