var ModulBezeichnung = Database.Benachichtigungen.Modul.get(ModulTitel);
var GruppenID = Database.Benachichtigungen.get(GruppenID);
var Betreff = Database.Benachichtigungen.get(Beschreibung);

function home() {

    class home {
        constructor (modulname, gruppenID, betreff) {
            this.modulname = modulname;
            this.gruppenID = gruppenID;
            this.betreff = betreff;
        }
        // toString?
    }

    Home = new Overview(
        document.getElementById("modulname").value,
        document.getElementById("gruppenID").value,
        document.getElementById("betreff").value
    );

    console.log(Home);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Home)
    };

    fetch("/GroupOverview", options)
        .then(response => response.json())
        .then(data => {

            alert(data.Home);

        });
}