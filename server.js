var express = require('express');
var bodyParser = require('body-parser');
const book = require('./src/book');
const user = require('./src/users');
const borrow = require('./src/borrow');
const util = require('util');

var app = express();
//app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//borrow API or route
app.get('/borrow', function (req, res) {
    var borrowData = borrow.getborrowList();
    res.send(borrowData);
});
app.get('/borrow/:id', function (req, res) {
    var borrowData = borrow.getborrowByID(req.params.id);
    res.send(borrowData);
});

// Book API path or route
app.get('/books', function (req, res) {
    var bookData = book.getBookList();
    res.send(bookData);
});

app.get('/books/:id', function (req, res) {
    var bookData = book.getBookById(req.params.id);
    res.send(bookData);
});


app.post('/books', function (req, res) {
    //book.saveBook(req.body);
    res.send(book.saveBook(req.body));
});

app.post('/users', function (req, res) {
    res.send(user.saveUser(req.body));
});

// Search Books API
app.get('/books/search/:title', function (req, res) {
    var booksSearchData = book.getbookSearchByTitle(req.params.title);
    res.send(booksSearchData);
});

//2.User API path
app.get('/users', function (req, res) {
    var usersdata = user.getUsersList();
    res.send(usersdata);
});
app.get('/users/:id', function (req, res) {
    var userdata = user.getUserByID(req.params.id);
    res.send(userdata);
});

//Listen at port 3000
const listen = function () {

    var host = server.address().address
    var port = server.address().port
  
    console.log("Example app listening at http://%s:%s", host, port)
  
  };

var server = app.listen(3000, listen);