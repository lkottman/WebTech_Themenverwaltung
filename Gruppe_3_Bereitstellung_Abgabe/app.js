const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
const mysql = require('mysql');
const cors = require('cors');
const { response } = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) =>{
    if(err) throw err
    console.log(connection.state);
})

app.get('/getSFTWPOOLData', (req, res) =>{
    let sql = 'SELECT * FROM softwarepool';
    
    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        } 
        res.json(result);

    })
})


app.get('/getNotificationData', (req, res) =>{
    let sql = 'SELECT * FROM notification';
    
    connection.query(sql, (err, result) =>{
        if (err){
            res.end();
            return;
        } 
        res.json(result);

    })
})

app.post('/insert', (req, res) =>{
    let sql = 'INSERT INTO softwarepool(SOFTWARENAME, SOFTWARE_BESCHREIBUNG, SOFTWARELINK) VALUES (?,?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Beschreibung, req.body.Link],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

app.post('/insertNotification', (req, res) =>{
    let sql = 'INSERT INTO notification(GROUP_NAME, BESCHREIBUNGS_TEXT) VALUES (?,?)';

    connection.query(sql,[req.body.SoftwareName, req.body.Anfrage],(err, result) =>{
        if(err) throw err;
        console.log('great Succsess!');
    })
})

app.delete('/delete/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM softwarepool WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

app.delete('/deleteNotification/:id', (req, res) =>{
    const { id } = req.params;
    let sql = 'DELETE FROM notification WHERE ID = ?';

    connection.query(sql, id, (err, result) =>{
        if(err) throw err;
        console.log('Row with the ID of ' + id + ' deleted');
    });

});

app.listen(PORT, (err) =>{
    if(err) throw err;
    console.log(`Server is starting on Port ${PORT}`)
});
