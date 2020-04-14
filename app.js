const path = require("path");
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

app.use((request, response, next) => {
    // console.log("request.cookies", request.cookies);
    // Read cookies from the request using 'request.cookies'
    // They are represented by an object whose properties are cookie-names
    // and the values associated with those properties are the corresponding
    // cookie values.
  
    const username = request.cookies.username;
  
    // Set propterties on 'response.locals' to create variables that
    // are global and available to all of the rendered templates
    response.locals.loggedInUserName = username || "";
  
    // The third argument to all middlewares is a callback function
    // named 'next'. When called, it tells Express that this middleware is complete
    // and moves on to the next middleware in line, or if it is the last middleware,
    // begins looking for the route that matches the request
    next();
  });



app.get("/", (req,res)=>{
    res.send("Welcome")
})

const sessionsRouter = require("./routes/sessionsRouter");
app.use("/", sessionsRouter);



const PORT = 3000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});