const book = require('../../src/book');
const expect = require('chai').expect;
var assert = require('assert');
const bookDataPath = './src/data/books.json';
const fs = require('../../src/helper/readfile');

describe('Book module', ()=>{
    describe('read functionality', ()=>{
        it('should return empty list if there is not book in the library.', ()=>{
            // 1. Prepare the data.
            fs.writeData(bookDataPath, []);

            // 2. Calling the function which is under test.
            let books = book.getBookList();
            // 3. Validate/assert the result.
            expect(books.length).to.equal(0);
        });
        it('should return only one book if there is only one book in the library.', ()=>{
            // 1. Prepare the data.
            fs.writeData(bookDataPath, [
                {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                }
            ]);

            // 2. Calling the function which is under test.
            let books = book.getBookList();
            // 3. Validate/assert the result.
            expect(books.length).to.equal(1);
        });
        it('should return all the book in the library.', ()=>{
            // 1. Prepare the data.
            fs.writeData(bookDataPath, [
                {
                    "ISBN": "0001",
                    "quantity": 1,
                    "title": "Enviromental science",
                    "description": "North america polution control",
                    "author": {
                        "name": "alex",
                        "address": "536638"
                    },
                    "publishedDate": "2/3/2017",
                    "id": "c6737fe0-a341-11e8-b2e4-5372b18e95e6"
                },
                {
                    "ISBN": "0002",
                    "quantity": 1,
                    "title": "Enviromental science",
                    "description": "North america polution control",
                    "author": {
                        "name": "alex",
                        "address": "536638"
                    },
                    "publishedDate": "2/3/2017",
                    "id": "e101fc60-a3d7-11e8-8ecc-3d928db23d9f"
                },
                {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                },
                {
                    "ISBN": "0004",
                    "quantity": 1,
                    "id": "02",
                    "title": "Introduction to computer",
                    "description": "Computer science and programming",
                    "author": {
                        "id": "11",
                        "name": "abebe",
                        "address": "Seattle"
                    },
                    "publishedDate": "2/3/2017"
                },
                {
                    "ISBN": "0005",
                    "quantity": 1,
                    "id": "03",
                    "title": "physics Introduction is one of the computer science",
                    "description": "physics",
                    "author": {
                        "name": "solomon",
                        "address": "66"
                    },
                    "publishedDate": "2/3/2014"
                },
                {
                    "ISBN": "0006",
                    "quantity": 1,
                    "title": "Enviromental science",
                    "description": "North america polution control",
                    "author": {
                        "name": "alex",
                        "address": "536638"
                    },
                    "publishedDate": "2/3/2017",
                    "id": "9eb98440-a341-11e8-b2e4-5372b18e95e6"
                }
            ]);

            // 2. Calling the function which is under test.
            let books = book.getBookList();
            // 3. Validate/assert the result.
            expect(books.length).to.equal(6);
        });

        describe('should search books by author id and', ()=>{
            it('return error message if there is no book in the library.', ()=>{
                // 1. Prepare the data.
                fs.writeData(bookDataPath, []);
    
                // 2. Calling the function which is under test.
                let messageData = "Empty file or there is no book associated with provided author ID.";
                let bookReturned = book.searchBookByAuthorID('10');
                // 3. Validate/assert the result.
                expect(bookReturned).to.equal(messageData);
                
            });
            it('return error message if there is no book associated with provided author ID.', ()=>{
                // 1. Prepare the data.
                fs.writeData(bookDataPath, [
                    {
                        "ISBN": "0003",
                        "quantity": 1,
                        "id": "01",
                        "title": "Introduction to math",
                        "description": "Math for computer science",
                        "author": {
                            "id": "10",
                            "name": "kebede",
                            "address": "Tacoma"
                        },
                        "publishedDate": "2/20/2011"
                    }
                ]);
    
                // 2. Calling the function which is under test.
                let messageData = "Empty file or there is no book associated with provided author ID.";
                let bookReturned = book.searchBookByAuthorID('11');
                // 3. Validate/assert the result.
                expect(bookReturned).to.equal(messageData);
                
            });
            it('return one book if there is only one book associated with the given author ID.', ()=>{
                // 1. Prepare the data.
                let book1 = {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                };
                fs.writeData(bookDataPath, [book1]);
    
                // 2. Calling the function which is under test.
                let bookReturned = book.searchBookByAuthorID('10');
                // 3. Validate/assert the result.
                expect(bookReturned.length).to.equal(1);
                // the return array should conatian only book1
                expect(bookReturned).to.deep.include(book1);
                
            });
            it('return list which contains more than one books that are associated with the given author id.', ()=>{
                // 1. Prepare the data.
                let book1 =                     {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                };
                let book2 =                     {
                    "ISBN": "0005",
                    "quantity": 1,
                    "id": "03",
                    "title": "physics Introduction is one of the computer science",
                    "description": "physics",
                    "author": {
                        "id": "10",
                        "name": "solomon",
                        "address": "66"
                    },
                    "publishedDate": "2/3/2014"
                };

                fs.writeData(bookDataPath, [
                    book1,
                    {
                        "ISBN": "0004",
                        "quantity": 1,
                        "id": "02",
                        "title": "Introduction to computer",
                        "description": "Computer science and programming",
                        "author": {
                            "id": "11",
                            "name": "abebe",
                            "address": "Seattle"
                        },
                        "publishedDate": "2/3/2017"
                    },
                    book2,
                    {
                        "ISBN": "0006",
                        "quantity": 1,
                        "title": "Enviromental science",
                        "description": "North america polution control",
                        "author": {
                            "name": "alex",
                            "address": "536638"
                        },
                        "publishedDate": "2/3/2017",
                        "id": "9eb98440-a341-11e8-b2e4-5372b18e95e6"
                    }
                ]);
    
                // 2. Calling the function which is under test.
                let bookReturned = book.searchBookByAuthorID('10');
                // 3. Validate/assert the result.
                expect(bookReturned.length).to.equal(2);
                expect(bookReturned).to.deep.include(book1);
                expect(bookReturned).to.deep.include(book2);
            });
        });

        describe('should search book title or description by any keyword and', ()=>{
            it('return error message if there is no book in the library.', ()=>{
                // 1. Prepare the data.
                fs.writeData(bookDataPath, []);
    
                // 2. Calling the function which is under test.
                let keyWord = 'physics';
                let bookDetail = book.searchBookByKeyWord(keyWord);
                // 3. Validate/assert the result.
                let messageData = "There is no books associated with the keyword.";
                expect(bookDetail).to.equal(messageData);
            });
            it('return error message if there is no book title or description that contains the given keword in the library.', ()=>{
                // 1. Prepare the data.
                fs.writeData(bookDataPath, [
                    {
                        "ISBN": "0003",
                        "quantity": 1,
                        "id": "01",
                        "title": "Introduction to math",
                        "description": "Math for computer science",
                        "author": {
                            "id": "10",
                            "name": "kebede",
                            "address": "Tacoma"
                        },
                        "publishedDate": "2/20/2011"
                    }
                ]);
    
                // 2. Calling the function which is under test.
                let keyWord = 'physics';
                let bookDetail = book.searchBookByKeyWord(keyWord);
                // 3. Validate/assert the result.
                let messageData = "There is no books associated with the keyword.";
                expect(bookDetail).to.equal(messageData);
            });
            it('return one book if the library has only one book and the book title or description contains the given keyword.', ()=>{
                // 1. Prepare the data.
                let book1 = {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                };
                fs.writeData(bookDataPath, [book1]);
    
                // 2. Calling the function which is under test.
                let keyWord = 'computer';
                let bookDetail = book.searchBookByKeyWord(keyWord);
                // 3. Validate/assert the result.
                expect(bookDetail.length).to.equal(1);
                expect(bookDetail).to.deep.include(book1);

            });
            it('return list of books in the library that contains the given keyword in their title or description.', ()=>{
                // 1. Prepare the data.
                let book1 = {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to machine learning",
                    "description": "Machine learning for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                };
                let book2 = {
                    "ISBN": "00012",
                    "quantity": 3,
                    "id": "3bbaab70-ac84-11e8-8d57-0fa52e4bf712",
                    "title": "Software Testing",
                    "description": "Test driven development",
                    "author": {
                        "id": "30",
                        "name": "Kebede",
                        "address": "SeaTac"
                    },
                    "publishedDate": "2/20/2010"
                };
                let book3 = {
                    "ISBN": "0001",
                    "quantity": 1,
                    "title": "Public health",
                    "description": "North American public health center",
                    "author": {
                        "id": "35",
                        "name": "alex",
                        "address": "536638"
                    },
                    "publishedDate": "2/3/2017",
                    "id": "c6737fe0-a341-11e8-b2e4-5372b18e95e6"
                };

                let book4 = {
                    "ISBN": "0002",
                    "quantity": 1,
                    "title": "Enviromental science",
                    "description": "Pollution prevention and control",
                    "author": {
                        "id": "15",
                        "name": "James",
                        "address": "536638"
                    },
                    "publishedDate": "2/3/2017",
                    "id": "e101fc60-a3d7-11e8-8ecc-3d928db23d9f"
                };

                let book5 = {
                    "ISBN": "0003",
                    "quantity": 1,
                    "id": "01",
                    "title": "Introduction to math",
                    "description": "Math for computer science",
                    "author": {
                        "id": "10",
                        "name": "kebede",
                        "address": "Tacoma"
                    },
                    "publishedDate": "2/20/2011"
                };

                let book6 = {
                    "ISBN": "0004",
                    "quantity": 1,
                    "id": "02",
                    "title": "Introduction to computer",
                    "description": "Computer science and programming",
                    "author": {
                        "id": "11",
                        "name": "abebe",
                        "address": "Seattle"
                    },
                    "publishedDate": "2/3/2017"
                };

                let book7 = {
                    "ISBN": "0005",
                    "quantity": 1,
                    "id": "03",
                    "title": "physics",
                    "description": "Introduction to physics",
                    "author": {
                        "id": "18",
                        "name": "solomon",
                        "address": "66"
                    },
                    "publishedDate": "2/3/2014"
                };

                fs.writeData(bookDataPath, [book1, book2, book3, book4, book5, book6, book7]);
    
                // 2. Calling the function which is under test.
                let keyWord = 'computer';
                let bookDetail = book.searchBookByKeyWord(keyWord);
                // 3. Validate/assert the result.
                expect(bookDetail.length).to.equal(3);
                expect(bookDetail).to.deep.include(book1);
                expect(bookDetail).to.deep.include(book5);
                expect(bookDetail).to.deep.include(book6);

            });
        })
    });
});