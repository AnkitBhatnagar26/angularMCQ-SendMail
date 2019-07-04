var express = require('express');
var router = express.Router();
var questions = require('../models/questions');

/* GET questions listing. */
router.get('/', function (req, res, next) {
    res.json({ questions: questions });
});

module.exports = router;
