const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  userExists = users.filter((user) => user.username === username);
  if (userExists.length > 0) return res.status(404).json({message: "User already exists!"});
  users.push({username:username, password:password})
  return res.status(200).json({message: "Username created correctly"})
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books,null, 3));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksAuthor = {};
  Object.entries(books).forEach(([key,book]) => {
    if(book.author.toLowerCase() === author.toLowerCase()){
        booksAuthor[key] = book;
    }
  });
  if (Object.keys(booksAuthor).length === 0) {
    return res.status(404).send("This author doesn't have books");
  }
  return res.send(JSON.stringify(booksAuthor,null, 3));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let booksTitle = {};
  Object.entries(books).forEach(([key,book]) => {
    if(book.title.toLowerCase() === title.toLowerCase()){
        booksTitle[key] = book;
    }
  });
  if (Object.keys(booksTitle).length === 0) {
    return res.status(404).send("There is no book with this title");
  }
  return res.send(JSON.stringify(booksTitle,null, 3));
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(!book) return res.status(404).send("There is no book with this isbn");
  return res.send(book.reviews);
});

module.exports.general = public_users;
