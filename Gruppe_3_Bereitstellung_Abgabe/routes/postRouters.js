// contains INSERT queries 
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const postRouter = express.Router();
// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });

// new entries for the softwarepool
postRouter.post('/insert', (req, res) =>{
    let sql = 'INSERT INTO softwarepool(SOFTWARENAME, SOFTWARE_BESCHREIBUNG, SOFTWARELINK) VALUES (?,?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Beschreibung, req.body.Link],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

// saving entries for admin notification
postRouter.post('/insertNotification', (req, res) =>{
    let sql = 'INSERT INTO notification(GROUP_NAME, BESCHREIBUNGS_TEXT) VALUES (?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Anfrage],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})


module.exports = postRouter;