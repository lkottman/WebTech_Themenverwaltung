<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <titel>Einfügen von Modulen in die Datenbank</titel>
</head>

<?php
// Verbindungsabfrage
$con = new mysqli("localhost", "admin", "password", "testdb");
if($con->connect_errno){
    die("Verbindung fehlgeschlagen: " . $mysqli->connect_error);
}

$sql = "INSERT INTO MODUL(NAME, BEGINN, ENDE) VALUES ('$_GET[titel]', $_GET[modulStart], $_GET[modulEnd])";
$con->query($sql);



echo "Modul Hinzugefügt"



?>


</html>