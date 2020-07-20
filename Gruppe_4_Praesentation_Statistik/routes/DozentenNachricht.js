var app = require('../app');
var con = require('../mysql');

/*const express = require('express');
const Message = express.Router();*/

id=[];
groupID =[];
nachricht = [];
datum = [];
anfrageArt= [];

app.get('/Messsage',function (request,result) {
    result.render('DozentenNachricht.ejs');

});
con.query("Select * from Nachrichten",function (result,err)
{
    if (err) throw err;

    for (var i= 0; i<result.length;i++)
    {
        id[i] = result[i].Nachricht_ID;
        nachricht[i] = result[i].Nachricht;
        datum[i] = result[i].Datum;
        anfrageArt[i] = result[i].Anfrage_art;
    }
});
app.listen(8080);