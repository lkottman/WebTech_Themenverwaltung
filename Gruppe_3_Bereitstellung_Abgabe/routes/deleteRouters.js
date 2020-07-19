// contains DELETE queries
const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');

const deleteRouter = express.Router();



// dotenv.config({path: '.env'});
// const connection = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.DB_PORT
// });



deleteRouter.delete('/delete/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM softwarepool WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

deleteRouter.delete('/deleteNotification/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM notification WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

module.exports = deleteRouter;