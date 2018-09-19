const fs = require('../../src/helper/readfile');
const expect = require('chai').expect;
const user = require('../../src/users'); 
const book = require('../../src/book'); 
const borrows = require('../../src/borrow'); 
//const borrows = require('../../src/borrow');

describe('Borrow Module', ()=>{
    describe('Get borrow functionality', ()=>{
        it('should not retrive any books if no user have not borrowed any books.', ()=>{
            //1. Prepare the data
            fs.writeData('./src/data/borrows.json', []);
            const borrows = require('../../src/borrow');
            //2. Call the function under test
            const borrowBooks = borrows.getBorrowedBookList();
            //3. Assertion or verification.
            expect(borrowBooks.length).to.equal(0);          

        });

        it('should retrive only one book if only one user borrow a single book.', ()=>{
             //1. Prepare the data
             fs.writeData('./src/data/borrows.json', []);
             fs.writeData('./src/data/books.json', []);
             fs.writeData('./src/data/users.json', []);
             //const user1 = require('../../src/users'); 
             const book = require('../../src/book'); 
             const borrows = require('../../src/borrow'); 
             const userInfo = {
                "userName": "solHab",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "00777",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };

             //2. Call the function under test
             const userId = user.saveUser(userInfo);
             const bookId = book.saveBook(bookInfo);
             const message = borrows.saveBorrowedBook(userId.id, bookId.id);
             const borrowBooks = borrows.getBorrowedBookList();
             //3. Assertion or verification "The book is added successfuly."
             expect(borrowBooks.length).to.equal(1);
             expect(borrowBooks[0].users.id).to.equal(userId.id);
             expect(borrowBooks[0].books[0].id).to.equal(bookId.id);
        });

        it('should retrive all books that the users are borrowed.', ()=>{
                //1. Prepare the data
                fs.writeData('./src/data/borrows.json', []);
                fs.writeData('./src/data/books.json', []);
                fs.writeData('./src/data/users.json', []);
                //const user = require('../../src/users'); 
                const book = require('../../src/book'); 
                const borrows = require('../../src/borrow'); 
                const userInfo = {
                   "userName": "solHab",
                   "userLName": "Hunegnaw",
                   "address": {
                       "street": "1000 N 260 st",
                       "city": "shoreline",
                       "state": "WA",
                       "zipcode": "98133"
                   },
               };
               const bookInfo = {
                   "ISBN": "00777",
                   "quantity": 1,
                   "title": "Enviromental science",
                   "description": "North america polution control",
                   "author": {
                       "name": "alex",
                       "address": "536638"
                   },
                   "publishedDate": "2/3/2017"
               };
               const bookInfo1 = {
                "ISBN": "8888",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
   
                //2. Call the function under test
                const userId = user.saveUser(userInfo);
                const bookId = book.saveBook(bookInfo);
                const bookId1 = book.saveBook(bookInfo1);
                const message = borrows.saveBorrowedBook(userId.id, bookId.id);
                const message1 = borrows.saveBorrowedBook(userId.id, bookId1.id);
                const borrowBooks = borrows.getBorrowedBookList();
                //3. Assertion or verification "The book is added successfuly."
                expect(borrowBooks[0].books.length).to.equal(2);
                expect(borrowBooks[0].users.id).to.equal(userId.id);
                expect(borrowBooks[0].books[0].id).to.equal(bookId.id);
                expect(borrowBooks[0].books[1].id).to.equal(bookId1.id);
        });

    describe('Get borrowed book', ()=>{
        it('should search by user ID when there is not borrowed book.', ()=>{
            //1. Prepare the data
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/users.json', []);
            const userInfo = {
                "userName": "solAman",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            //2. Call the function under test
            const userId = user.saveUser(userInfo);
            const borrowBooks = borrows.getBorrowedBookList();
            expect(borrowBooks.length).to.equal(0);
        });
        it('should search by user ID when there is only one borrowed book', ()=>{
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "habss",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "00777",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const bookinf = book.saveBook(bookInfo);
            const message = borrows.saveBorrowedBook(userinf.id, bookinf.id);
            var borrowbook = borrows.getborrowByID(userinf.id);
            expect(borrowbook.length).to.equal(1);
            //expect(userinf[0].id).to.equal(borrowbook[0].userId.id);
            expect(bookinf.id).to.equal(borrowbook[0].id);

        });
        it('should search by ID when users are borrowed more than one books', ()=>{
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "habss",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "333",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const bookInfo1 = {
                "ISBN": "3333",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const bookinf = book.saveBook(bookInfo);
            const bookinf1 = book.saveBook(bookInfo1);
            const message = borrows.saveBorrowedBook(userinf.id, bookinf.id);
            const message1 = borrows.saveBorrowedBook(userinf.id,bookinf1.id)
            var borrowbook = borrows.getborrowByID(userinf.id);
            expect(borrowbook.length).to.equal(2);
            expect(bookinf.id).to.equal(borrowbook[0].id);
        });
    });
    describe('Borrow book', ()=>{

        it('the sysstem should not borrow book that the book is unregistored book', ()=>{
            //fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "Ephramss",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "88",
                "quantity": 1,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const bookInfo1 = {
                "ISBN": "99",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const bookinf = book.saveBook(bookInfo);
            const bookinf1 = book.saveBook(bookInfo1);
            const message = borrows.saveBorrowedBook(userinf.id, 5677899444);
            console.log(message.message);
            expect(message.message).to.equal('The requested book is not available.');
            

        });
        it('the system should borrow a single book', ()=>{
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "Aklilu",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "88",
                "quantity": 4,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const bookinf = book.saveBook(bookInfo);
            const message = borrows.saveBorrowedBook(userinf.id, bookinf.id);
            var borrowbook = borrows.getborrowByID(userinf.id);
            expect(borrowbook.length).to.equal(1);
            expect(bookinf.id).to.equal(borrowbook[0].id);

            
        });
        it('the system should borrow book more than one books at a time', ()=>{
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "Kaleb",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "33",
                "quantity": 1,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const bookInfo1 = {
                "ISBN": "44",
                "quantity": 1,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const bookinf = book.saveBook(bookInfo);
            const bookinf1 = book.saveBook(bookInfo1);
            const message = borrows.saveBorrowedBook(userinf.id, bookinf.id);
            const message1 = borrows.saveBorrowedBook(userinf.id, bookinf1.id);
            const detailBook = borrows.getborrowByID(userInfo.id);
            expect(bookinf.id).to.equal(detailBook[0].id);
            expect(bookinf1.id).to.equal(detailBook[1].id);

        });
        it('the system should not borrow book that all the books are already check out.', ()=>{
            fs.writeData('./src/data/borrows.json', []);
            fs.writeData('./src/data/books.json', []);
            fs.writeData('./src/data/users.json', []);

            const userInfo = {
                "userName": "checkout",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const userInfo1 = {
                "userName": "Trycheckout",
                "userLName": "Hunegnaw",
                "address": {
                    "street": "1000 N 260 st",
                    "city": "shoreline",
                    "state": "WA",
                    "zipcode": "98133"
                },
            };
            const bookInfo = {
                "ISBN": "65",
                "quantity": 1,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const bookInfo1 = {
                "ISBN": "64",
                "quantity": 1,
                "title": "Enviromental science",
                "description": "North america polution control",
                "author": {
                    "name": "alex",
                    "address": "536638"
                },
                "publishedDate": "2/3/2017"
            };
            const userinf = user.saveUser(userInfo);
            const userinf1 = user.saveUser(userInfo1);
            const bookinf = book.saveBook(bookInfo);
            const bookinf1 = book.saveBook(bookInfo1);
            const message1 = borrows.saveBorrowedBook(userinf.id, bookinf.id);
            const message11 = borrows.saveBorrowedBook(userinf.id, bookinf1.id);
            const message2 = borrows.saveBorrowedBook(userinf1.id, bookinf.id);
            const message22 = borrows.saveBorrowedBook(userinf1.id, bookinf1.id);
            const detailBook = borrows.getborrowByID(userInfo.id);
            const detailBook1 = borrows.getborrowByID(userInfo.id);
            console.log(detailBook[0].id);
            console.log(detailBook1[0].id);
            expect(bookinf.id).to.equal(detailBook[0].id);
            expect(bookinf1.id).to.equal(detailBook[1].id);

            expect(message2.message).to.equal('User could not borrow the book.');
            expect(message22.message).to.equal('User could not borrow the book.');
        });

    });
});
});
