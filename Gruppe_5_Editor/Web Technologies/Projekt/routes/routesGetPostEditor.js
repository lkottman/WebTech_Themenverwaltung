const express = require("express");
const router = express.Router();
const connection = require('../../../../getConnectionDatabase.js');

const redirect = require("../../../../index");
const app = express();

const path = require("../../../../config/pathConfig.json");

router.get("/requirements", (request, response) => {
  response.sendFile(path.path+'/Gruppe_5_Editor/Web Technologies/Projekt/HTML/MainPage.html');
});

router.post("/createTable", (request, response) => {

  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("CREATE TABLE IF NOT EXISTS " + request.body.tablename + "requirement "
      + "(ID VARCHAR(50), "
      + "Name VARCHAR(50), "
      + "Shortdesc LONGTEXT)",
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Table created");
        }
      });
  response.end();
});

router.post("/saveReqData", (request, response) => {

  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("INSERT INTO Anforderungen(id,name,shortdesc) VALUES("
      + '"' + request.body.id + '",'
      + '"' + request.body.name + '",'
      + '"' + request.body.shortdesc + '")',
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Requirement created");
        }
      });
  response.end();
});

router.post("/delReqData", (request, response) => {
  if (request.method === "OPTIONS") {
    response.set('Access-Control-Allow-Origin', '*');
    response.set('Access-Control-Allow-Headers', 'Content-Type');
    response.status(204).send('');
  }

  connection.query("DELETE" + " FROM " + "Anforderungen " + "WHERE("
      + 'id="' + request.body.id + '")',
      function (err) {
        if (err)
          throw err;
        else {
          console.log("Requirement deleted");
        }
      });
  response.end();
});

router.post("/loadtable", (request, response) => {

  connection.query("SELECT * FROM ANFORDERUNGEN", function (err, result, fields) {
    if (err)
      throw err;
    else {
      console.log(result);
    }
  })
});

module.exports = router;