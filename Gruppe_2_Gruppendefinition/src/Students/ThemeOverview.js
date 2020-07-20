/**var Modulname = Database.Module.get(Titel);
var ThemaTitel = Database.Module.Thema.get(Titel);
var currentParticipants = Database.Module.Thema.get(Mitglieder);
var maxParticipants = Database.Module.Thema.get(maxParticipants);*/

function themeOverview() {

    class ThemeOverview {
        constructor (modulname, thementitel, mitgliederanzahl, maximaleMitglieder) {
            this.modulname = modulname;
            this.thementitel =thementitel;
            this.mitgliederanzahl = mitgliederanzahl;
            this.maximaleMitglieder = maximaleMitglieder;
        }
        // toString?
    }

    Overview = new ThemeOverview(
        document.getElementById("modulname").value,
        document.getElementById("thementitel").value,
        document.getElementById("mitgliederanzahl").value,
        document.getElementById("maximaleMitglieder").value
    );

    console.log(ThemeOverview);

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(ThemeOverview)
    };

    fetch("/GroupOverview", options)
        .then(response => response.json())
        .then(data => {

            alert(data.ThemeOverview);

        });
}