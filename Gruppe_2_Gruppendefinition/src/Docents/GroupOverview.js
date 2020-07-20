/** var Modulname = Database.Module.get(Titel);
var ThemaTitel = Database.Module.Thema.get(Titel);
var currentParticipants = Database.Module.Thema.get(Mitglieder);
var maxParticipants = Database.Module.Thema.get(maxParticipants);
*/

function groupOverview() {

    class Overview {
        constructor (modulname, themaTitel, currentParticipants, maxParticipants) {
            this.modulname = modulname;
            this.themaTitel = themaTitel;
            this.currentParticipants = currentParticipants;
            this.maxParticipants = maxParticipants;
        }
        // toString?
    }

    Overview = new Overview(
        document.getElementById("modulname").value,
        document.getElementById("themaTitel").value,
        document.getElementById("currentParticipants").value,
        document.getElementById("maxParticipants").value
    );

    console.log(Overview);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Overview)
    };

    fetch("/GroupOverview", options)
        .then(response => response.json())
        .then(data => {

            alert(data.Overview);

        });
}