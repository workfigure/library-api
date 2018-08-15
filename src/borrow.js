const fs = require('fs');

let borrowrawdata = fs.readFileSync('./src/data/borrow.json');  
let borrow = JSON.parse(borrowrawdata);
let booksrawdata = fs.readFileSync('./src/data/books.json');  
let books = JSON.parse(booksrawdata);  
let usersrawdata = fs.readFileSync('./src/data/users.json');  
let users = JSON.parse(usersrawdata);

function getborrowList(){
    return borrow;
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