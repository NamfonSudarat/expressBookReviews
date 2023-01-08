const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');



public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});

  });

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//     res.send(JSON.stringify(books,null,4));
// });
public_users.get('/',function (req, res) {
    const booksPromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve(res.send(JSON.stringify(books,null,4)))
        },300);
        })
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//     const isbn = req.params.isbn;
//     if (isbn in books) {
//         // If the book exists, send the book details as a response
//         res.send(books[isbn]);
//       } else {
//         // If the book does not exist, return a 404 error
//         res.status(404).send({ error: 'Book not found' });
//       }

//  });
public_users.get('/isbn/:isbn',function (req, res) {
    new Promise((resolve) => {
        setTimeout(() => {
            const isbn = req.params.isbn;
            resolve(res.send(books[isbn]))
        },300);
        })
 });
  
// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//     const author = req.params.author;
//     const authorsBooks = [];
  
//     for (const bookId in books) {
//       // Get the current book
//       const book = books[bookId];
//       if (book.author === author) {
//         // If the book was written by the specified author, add it to the 'authorsBooks' array
//         authorsBooks.push(book);
//       }
//     }
//     res.send(authorsBooks);

// });
public_users.get('/author/:author',function (req, res) {
    new Promise((resolve) => {
        setTimeout(() => {
        const author = req.params.author;
        let book = [];
        Object.keys(books).forEach(x => {
            if(books[x].author.toLowerCase() == author.toLowerCase()){
                book.push(books[x])
                resolve(res.send(book))
            }
        },400);
    })
})

});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//     const booksTitle = [];
  
//     for (const bookId in books) {
//       // Get the current book
//       const book = books[bookId];
//       if (book.title === title) {
//         booksTitle.push(book);
//       }
//     }
//     res.send(booksTitle);

// });
public_users.get('/title/:title',function (req, res) {
    new Promise(() => {
        setTimeout(() => {
          const bookTitle = req.params.title;
          Object.keys(books).forEach(x => {
            if (books[x].title == bookTitle) {
              res.send(books[x]);
            }
          }, 300);
        })
      });
    });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
  // If the book was found, send the 'reviews' property as the response
    if (book) {
    res.send(book.reviews);
    } else {
    res.status(404).send('Book not found');
  }

});

module.exports.general = public_users;

