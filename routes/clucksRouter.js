const express = require("express");
const knex = require("../db/connection");
const utils =require("../db/utils")

const router = express.Router();


router.get("/new", (request, response) => {
    if(request.cookies.username){
    response.render("clucks/new");
    }else {
    response.redirect("/sign_in")  
    }
});

router.post("/", (request, response) => {
    const username = request.cookies.username
    const { image_url, content } = request.body;
    console.log(request.cookies)
        knex("clucks")
        .insert({
            image_url,
            content,
            username
        })
        .returning("*")
        .then(() => {
            response.redirect("/clucks");
        });

      
});

router.get("/", (request, response) => {
    knex("clucks")
        .orderBy("created_at", "desc")
        .then((clucks) => {
          response.render("clucks/index", { clucks, utils });
        });
});



module.exports = router  