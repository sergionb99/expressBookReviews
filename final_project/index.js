const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticated, users } = require('./router/auth_users.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

function authenticatedUser(username,password) {
    const userExists = find(users.find((user) => { user.username === username && user.password === password}));
    if (userExists.length > 0) return true
    else return true;
}


app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    const username = req.body.username;
    const password = req.body.password;
    if(!username && !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    if(authenticatedUser(username,password)){
        let accessToken = jwt.sign({
            data: password}, 'access', { expiresIn: 60 })
        req.session.authorization = {accessToken, username};
        return res.status(200).send('User login correctly');
    }
    else{
        return res.status(208).json({ message: "Invalid login." });
    }
});
 
const PORT =4000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
