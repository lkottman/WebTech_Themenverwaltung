// contains SELECT * queries
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const getRouter = express.Router();
// dotenv.config({path: '.env'});
// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });


getRouter.get('/getSFTWPOOLData', (req, res) =>{
    let sql = 'SELECT * FROM softwarepool';
    
    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        } 
        res.json(result);

    })
})


getRouter.get('/getNotificationData', (req, res) =>{
    let sql = 'SELECT * FROM notification';
    
    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        } 
        res.json(result);

    })
})

module.exports = getRouter;