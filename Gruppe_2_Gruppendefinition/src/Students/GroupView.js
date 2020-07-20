/**
var Beschreibung = Database.Person.Modul.Thema.get(Beschreibung);
var Gruppenmitglieder = Database.Person.Modul.Thema.get(currentMitglieder);
var Links = Database.Person.Modul.Thema.get(Links);
var Meilensteine = Database.Person.Modul.Thema.get(Meilensteine);

var NewMilestoneName = document.getElementById("milestoneName").value;
var milestoneDate = document.getElementById("milestoneDate").value;
var Linktitel = document.getElementById("Linktitel").value;
var Link = document.getElementById("Link").value;*/

function groupView() {

    class GroupView {
        constructor (thementitel, beschreibung, mitglieder, links, meilensteine) {
            this.thementitel = thementitel;
            this.beschreibung =beschreibung;
            this.mitglieder = mitglieder;
            this.links = links;
            this.meilensteine = meilensteine;
        }
        // toString?
    }

    Overview = new GroupView(
        document.getElementById("thementitel").value,
        document.getElementById("beschreibung").value,
        document.getElementById("mitglieder").value,
        document.getElementById("links").value,
        document.getElementById("meilensteine").value,
    );

    console.log(GroupView);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(GroupView)
    };

    fetch("/GroupOverview", options)
        .then(response => response.json())
        .then(data => {

            alert(data.GroupView);

        });
}


