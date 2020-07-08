let http = require('http');
let url = require('url');
let mysql = require('mysql'); // to get auto complition u nedd to add ./

let connection = mysql.createConnection(
    {
        host : "localhost",
        user : "root",
        password : "Pee9aiy8ae@",
        database: "webtech"
    }
);

connection.connect(function (err)
{
    if (err)
        throw err;

    console.log("Connected!");

});


http.createServer(function(request,response)
    {

        let query = url.parse(request.url,true).query;
        if (query.password)
        {
            response.writeHead(200,{'Content-Type' : 'text/html'});
            query.password = "'" + query.password + "'";
            query.e_mail = "'" + query.e_mail + "'";

            //insert Statement
            var sql = "UPDATE Student SET Passwort= " + query.password +" WHERE E_Mail = "+ query.e_mail + ";";

            connection.query(sql,
                function (err, result)
                {
                    if (err)
                        throw err;

                    console.log("Row inserted:  Passwort:" + query.password + ", E-Mail: sven.petersen@hs-osnabrueck.de");

                });
        }
        else
        {
            console.error("Request did not include password!")

        }

        for (let property in query)
        {
            console.log(property + " = " + query[property]);
        }
        response.end();

    }
).listen(1000);