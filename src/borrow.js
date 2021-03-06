
const fs = require('fs'); //The keyword require is used in Node.js to import modules.
const readfile = require('./helper/readfile');

const userDataPath = './src/data/users.json';
const bookDataPath = './src/data/books.json';
const borrowDataPath = './src/data/borrows.json';

let borrow = readfile.getData(borrowDataPath);  
let books = readfile.getData(bookDataPath);
let users = readfile.getData(userDataPath);

function getBorrowedBookList(){ 
    var borrowedBookList = [];

    borrow.forEach((item)=>{
        if(!item || !item.userId || !item.bookIds){
            continue;
        }

        let borrowedBooks = {
            users:{},
            books: []
        };

        borrowedBooks.users = user.getUserByID(item.userId);

        item.bookIds.forEach((bookId)=>{
            borrowedBooks.books.push(book.getBookById(bookId));
        });

        borrowedBookList.push(borrowedBooks);
    });
 
    return borrowedBookList;
}

function getborrowByID(userID){
    let borrow = readfile.getData(borrowPath);  
    var borrowedBooks = [];
    for(var i=0; i < borrow.length; i++){
        if(borrow[i].userId == userID){
            for(var j = 0; j < borrow[i].bookIds.length; j++){
                borrowedBooks.push(book.getBookById(borrow[i].bookIds[j]));            
            }
        }
    }
    
    return borrowedBooks;
}

function saveBorrowedBook (userID, bookID){
    // for borrowing book, user is expected to present user id and book id
    let users = readfile.getData(userPath);
    let books = readfile.getData(bookPath);
    let borrow = readfile.getData(borrowPath);
    var userExist = false;
    var bookExist = false;
    //1. Verify the user exists        
    for (var i = 0; i < users.length; i++){
        if (users[i].id == userID){
            userExist = true;
        }
    }
    if (!userExist){
        return {
            message: 'The user is not a member of the library'
        };
    }

     //2. Verify the book exists and get its quantity
    let totalBookQuantity = 0;
    for (var i = 0; i < books.length; i++){
        if (books[i].id == bookID) {
                bookExist = true;
                totalBookQuantity = books[i].quantity;
        }
    }
  
    if (!bookExist){
        return {
            message: 'The requested book is not available.'
        };   
    }

    //3. Verify if the library has extra copy to rent
    // get aleady rented copies
    let borrowedBookQuantity = 0; 
    for (var i = 0; i < borrow.length; i++){
        for (var j = 0; j < borrow[i].bookIds.length; j++){
            if (borrow[i].bookIds[j] == bookID){
            borrowedBookQuantity++;
            }
        }
     }

    // get remaining copies
    var quantityRemaining = totalBookQuantity - borrowedBookQuantity;
    
    if(quantityRemaining > 0){
        let userExistInBorrowBook = false;
        // if user borrowed other book already, add book id to user borrow detail
        for(var i = 0; i < borrow.length; i++){
            if(borrow[i].userId == userID ){
                borrow[i].bookIds.push(bookID);
                userExistInBorrowBook = true;
            }
        }
        // if user not yet borrowed a book, add user borrow detail
        if(!userExistInBorrowBook){
            var newBorrowedBook = {
                "bookIds": [bookID], 
                "userId": userID
            };
            borrow.push(newBorrowedBook);
        }

         // write the borrowed book to the json file (overwrite)
        fs.writeFileSync(borrowPath, JSON.stringify(borrow)); 

        return {
            message: 'The book is added successfuly.'
        }; 
    }

     return {
        message: 'User could not borrow the book.'
    };
}

module.exports = {
    getborrowByID: getborrowByID,
    getBorrowedBookList: getBorrowedBookList,
    saveBorrowedBook: saveBorrowedBook
};