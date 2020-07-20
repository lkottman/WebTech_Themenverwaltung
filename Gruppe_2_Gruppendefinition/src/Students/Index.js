var Description = Database.Benachichtigungen.get(Description); //Modulbezeichnung
var Milestonetitle = Database.Benachichtigungen.get(Milestonetitle);
var DateOfMilestone = Database.Benachichtigungen.get(DateOfMilestone);

let checkEntry = "SELECT EXISTS(SELECT * FROM USER WHERE e_mail = '" + email +  "') AS test" + ";";
console.log(checkEntry);

connection.query(checkEntry, function (err, result, fields) {
    if (err) throw err;

    // checks if entry exists
    let check = result[0].test;
    console.log(check);
});