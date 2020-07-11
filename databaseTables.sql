DROP SCHEMA IF EXISTS webtech;
CREATE SCHEMA webtech;
USE webtech; -- for server deployment this need to set as Webtech

Drop Table IF EXISTS Student;
CREATE TABLE Student(
 id INTEGER auto_increment not null,
 e_mail VARCHAR(255),
 passwort VARCHAR(255),
 vorname VARCHAR(255),
 nachname VARCHAR(255),
 geburtsdatum date,
 matrikel_nr varchar(6),
 secret_token VARCHAR(255),
 verified boolean,
 PRIMARY KEY(id)
);

DROP TABLE IF EXISTS Dozent;
CREATE TABLE Dozent(
id integer auto_increment not null,
e_mail VARCHAR(255),
passwort VARCHAR(255),
vorname VARCHAR(255),
nachname VARCHAR(255),
geburtsdatum date,
rolle int,
PRIMARY KEY(id)
);

DROP TABLE IF EXISTS Modul;
CREATE TABLE Modul(
modul_id int,
beschreibung VARCHAR (255),
teilnehmer_anzahl int,
PRIMARY KEY (modul_id)
);


-- forgein-keys need to be added
DROP TABLE IF EXISTS Student_Modul;
CREATE TABLE Student_Modul(
matrikel_nr varchar(6),
modul_id int
);


INSERT INTO Student(e_mail,passwort, vorname, nachname, geburtsdatum, matrikel_nr, secret_token, verified )VALUES(
'sven.petersen@hs-osnabrueck.de',
'test',
'Sven',
'Petersen',
'1998-11-24',
'867632',
'1',
false
);

drop table if exists USER;
create table USER(
                     ID integer auto_increment,
                     TOKEN varchar(255),
                     NAME varchar(255),
                     SURNAME varchar(255),
                     EMAIL varchar(255),
                     PASSWORD varchar(255),
                     VERIFIED boolean,
                     AUTHORIZATION varchar(255),
                     primary key (id)
);

INSERT INTO USER( TOKEN, NAME, SURNAME, EMAIL, PASSWORD, VERIFIED, AUTHORIZATION)
VALUES (
    'ABC',
    'Petersen',
    'Sven',
        'sven.petersen@hs-osnabrueck.de',
        'petersen',
        true,
        'student'

);

drop table if exists token;
create table token(
                      ID integer auto_increment,
                      START datetime,
                      TIME int,
                      END datetime,
                      GENTOKEN varchar(255),
                      USER int,
                      primary key (ID)
);

INSERT INTO token (START, TIME, END, GENTOKEN, USER)
VALUES (
        '2020-07-11',
        99999999,
        '2020-09-20',
        'ABC',
        1
       );

CREATE TABLE pw_forgot_token(
    id integer auto_increment not null ,
    e_mail VARCHAR(255),
    start datetime,
    end datetime,
    token VARCHAR(255),
    PRIMARY KEY (id)
)