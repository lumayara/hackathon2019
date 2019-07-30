var express = require('express');
var router = express.Router();
var voice = require('./dialogflow');



router.post('/', async function(req,res,next) {
    let query = req.body.query;      // your JSON
    console.log(req.body.query);      // your JSON

    let data = await voice("hackaton-ehlily", query);

    res.json({data: data});
});

module.exports = router;