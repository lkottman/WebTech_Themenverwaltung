/*
Author: Constantin Brans
 */

const app = require('../app');
const express = require('express');
const G4_02000600 = express.Router();
const pool = require('../pool');


reihenfolge =[];
gruppe=[];
thema=[];
mitglieder=[];
startzeit=[];
dauer=[];
raum=[];
ende =[];
tag=[];
anlass=[];
modul=[];
getValuesfromDb();


G4_02000600.get('/G4-0200', function (request, result) {

    //Für den Zugriff auf die Seite für Admin und Dozent sonst redirect zu G4-0200fs
  //  if (request.session.userAuthorization === "lecturer"
    //    || request.session.userAuthorization === "admin") {


    result.render("G4-0200.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",
        modulthema: "Zwischenpräsentation",
        datum: tag[0],
        raum: raum,

    });
//}else
  //  {
    //    result.redirect('/G4-0200fS');
    //}

});
//getConnection();
/*app.listen(8080, function () {
    console.log('Server running at http://127.0.0.1:8080/G4-0200');

});*/



    //Datenbankabfrage
    function getValuesfromDb() {

        var sql = "SELECT DISTINCT * FROM praesentation_reihenfolge ";

        pool.query(sql, function (err,result) {
            if (err) throw err;

            for (var i = 0; i < result.length; i++) {
                reihenfolge[i] = result[i].Reihenfolge;
                gruppe[i] = result[i].GruppenNummer;
                thema[i] = result[i].Praesentationsthema;
                mitglieder[i] = result[i].Anzahl_Mitglieder;
                startzeit[i] = result[i].Startzeit;
                dauer[i] = result[i].Dauer;
                ende[i] = result[i].Endzeit;
                raum[i] = result[i].Raum;
                tag[i] = result[i].Tag;
                anlass = result[i].Anlass;
                modul = result[i].modul;
            }
        });
}
G4_02000600.post('/getIdValues', function (request, result) {

    var beforeOrder = thema;
    var afterOrder =JSON.parse(request.body.afterDrag);

    for (var i=0;i<beforeOrder.length;i++)
    {
        var value = i+1;
        var sql = "UPDATE test set ordering="+ value + "  where thema = '"+afterOrder[i]+"';";
        pool.query(sql,function (err,result) {
            if (err) throw err
            console.log("Geändert");
        });
    }


    console.log(beforeOrder);
    console.log(afterOrder);
});

G4_02000600.post('/Livetracking', function (request,result)
{
    result.render("G4-0600.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",
        modulthema: "Zwischenpräsentation",
        datum: tag[0],
        raum: raum,
    });
});

G4_02000600.post('/sendToDB', function (request,result) {
    var plusone = parseInt(request.body.i)+1;
    sqlStatement= "UPDATE praesentation_reihenfolge SET Startzeit='"+request.body.start+"',Dauer='"+request.body.dauer+"',Endzeit = CAST(Startzeit+Dauer AS TIME) WHERE Reihenfolge="+ plusone+";";
    pool.query(sqlStatement, function (err) {
        if (err) throw err;
    });
    getValuesfromDb();
    setTimeout(() => {   result.render("G4-0600.ejs", {
        //Verwaltungsanzeigen
        //Benutzername
        benutzername: "Rokko",

        //Modulinformationen

        modulname: "Web-Technologien",
        modulthema: "Zwischenpräsentation",
        datum: tag[0],
        raum: raum,
    }); }, 100)
})


module.exports = G4_02000600;
