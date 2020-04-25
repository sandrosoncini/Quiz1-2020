const express = require("express");
const knex = require("../db/connection");

const router = express.Router();

router.get("/sign_in", (request, response) => {
    response.render("sessions/signIn");
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post('/sign_in',(req,res)=>{
    const params = req.body;

    res.cookie('username', params.username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/clucks')
});  

router.post("/sign_out", (req, res) => {

    res.clearCookie("username");
    res.redirect("/sign_in");
});

module.exports = router;