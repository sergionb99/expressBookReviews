const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const validUser = users.filter((user) => {user.username === username && user.password === password});
    if (validUser) return true
    else return false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if(!username || !password){
    return res.status(208).json({ message: "Invalid login." });
  }
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({
        data: password
    }, 'access', { expiresIn: 60})
    req.session.authorization = {
        accessToken, username
    };
    return res.status(200).send('User login correctly');
  }
  return res.status(208).json({ message: "User not exists." });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
