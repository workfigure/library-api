var express = require('express');
const book = require('./src/book');

var app = express();

// Book API path or route
app.get('/books', function (req, res) {
    var bookData = book.getBookList();
    res.send(bookData);
});
app.get('/books/:id', function (req, res) {
    var bookData = book.getBookById(req.params.id);
    res.send(bookData);
});


//Listen at port 3000
const listen = function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  };

var server = app.listen(3000, listen);