r

const connection = require('../../../../../getConnectionDatabase.js');


connection.query(sql,
    function (err, result)
    {
        if (err)
            throw err;

        console.log("Row inserted:  Passwort:" + query.password + ", E-Mail: sven.petersen@hs-osnabrueck.de");

    });