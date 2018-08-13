const fs = require('fs');

let borrowrawdata = fs.readFileSync('./src/data/borrow.json');  
let borrow = JSON.parse(borrowrawdata);
let rawdata = fs.readFileSync('./src/data/books.json');  
let books = JSON.parse(rawdata);  
let userrawdata = fs.readFileSync('./src/data/users.json');  
let users = JSON.parse(userrawdata);

function getborrowList(userID){
    var book, y;
    for(var i = 0; i < users.length; i++){
        if(users[i].id == userID){
            for(var j = 0; j < borrow.length; j++){
                //for(var k = 0; k < borrow.length; k++){ //books.json
                        if(borrow.userID[j].id == userID){
                            for(var x = 0; x < books.length; x++){
                                if(borrow.books[y] == books.id[x]){
                                    book = books[x];
                                }
                            }   
                    }
                //}
            }
        }
        if(!book){  
            return {message: 'User doesnt registor in our system. try to inseer the correct user id'};
        }
    }
    return book;
}

function getborrowByID(userID, bookID){
    var book;
    for(var i=0; i< users.length; i++){
        if(users[i].id == userID){
            for(var j = 0; j < books.length; j++){
                if(books[j].id == bookID){
                    book = books[j];
                }
            }
        }
        if(!book){  
            return {message: 'we are not cary the book you searched'};
        }
    }
    return book;
}

module.exports = {
    getborrowList: getborrowList,
    getborrowByID: getborrowByID
};