const express = require('express');
const cronController = require('../controllers/cron.controller.js');
const cronRouter = express.Router();

cronRouter.get('/get', (req,res) => {
    console.log("==========>>>>>>>>");
    return res.json({
        status: true,
        message: "All Good",
    })
})
cronRouter.get('/cron', cronController);


module.exports = cronRouter;