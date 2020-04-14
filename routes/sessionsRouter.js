const express = require("express");

const router = express.Router();

router.get("/sign_in", (request, response) => {
    response.render("sessions/signIn");
});

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post('/sign_in',(req,res)=>{
    const params = req.body;

    res.cookie('username', params.username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/')
});  

router.post("/sign_out", (req, res) => {

    res.clearCookie("username");
    res.redirect("/");
});

module.exports = router;