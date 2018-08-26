const book = require('../../src/book');
const expect = require('chai').expect;

describe('Book module', ()=>{
    it('should fetch all books', ()=>{
        const allbook = book.getBookList();
        expect(allbook.length).greaterThan(0);
    });

    it('should add a new book', ()=>{
        var bookData =     {
            "ISBN": "00012312",
            "quantity": 1,
            "id": "01",
            "title": "TEst book",
            "author": {
                "id": "10",
                "name": "kebede",
                "address": "Tacoma"
            },
            "publishedDate": "2/20/2010"
        };

        var allbook = book.getBookList();
        const initialBookCount = allbook.length;
        book.saveBook(bookData);
        allbook = book.getBookList();
        const latestBookCount = allbook.length;

        expect(latestBookCount).to.equal(initialBookCount + 1);
    });
});