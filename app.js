

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
    const username = request.cookies.username;
    response.locals.loggedInUserName = username || "";
    console.log(response.locals)
    next();
  });



app.get("/", (req,res)=>{
    res.redirect("clucks")
})

const sessionsRouter = require("./routes/sessionsRouter");
app.use("/", sessionsRouter);

const clucksRouter = require("./routes/clucksRouter");
app.use("/clucks", clucksRouter);


const PORT = 3000;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});