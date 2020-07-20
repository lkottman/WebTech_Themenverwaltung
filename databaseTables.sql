DROP SCHEMA IF EXISTS Webtech;
CREATE SCHEMA Webtech;
USE Webtech;


DROP TABLE IF EXISTS MODUL;
CREATE TABLE MODUL(
modul_id INT,
beschreibung VARCHAR (255),
teilnehmer_anzahl INT,
PRIMARY KEY (modul_id)
);


-- forgein-keys need to be added
DROP TABLE IF EXISTS STUDENT_MODUL;
CREATE TABLE STUDENT_MODUL(
matrikel_nr varchar(6),
modul_id int
);
DROP TABLE IF EXISTS AGENDA;
create table AGENDA (
    aid               int auto_increment
        primary key,
    pid               int          null,
    reihenfolge       int          null,
    gruppennummer     int          null,
    thema             varchar(255) null,
    anzahl_mitglieder int          null,
    start_vortrag     time         null,
    dauer_vortrag     time         null,
    ende_vortrag      time         null,
    datum             date         null,
    constraint agenda_G4_PRAESENTATION_pid_fk
        foreign key (pid) references G4_PRAESENTATION (pid)
);
DROP TABLE IF EXISTS G4_PRAESENTATION;
create table G4_PRAESENTATION
(
    pid        int auto_increment
        primary key,
    projekt_id int          null,
    datum      date         null,
    raum       varchar(255) null,
    tagstart   time         null,
    tagende    time         null,
    anlass     varchar(255) null,
    modul      varchar(255) null,
    constraint G4_PRAESENTATION_G4_THEMA_tid_fk
        foreign key (projekt_id) references G4_THEMA (tid)
);
DROP TABLE IF EXISTS G4_THEMA;
create table G4_Thema
(
    projekt_beschreibung varchar(255) null,
    tid                  int auto_increment
        primary key,
    pmodul_bezeichnung   varchar(255) null,
    semester             varchar(255) null
);
DROP TABLE IF EXISTS PW_FORGOT_TOKEN;
CREATE TABLE PW_FORGOT_TOKEN(
                                id INTEGER AUTO_INCREMENT ,
                                e_mail VARCHAR(255),
                                start DATETIME,
                                end DATETIME,
                                token VARCHAR(255),
                                used boolean,
                                PRIMARY KEY (id)
);

DROP TABLE IF EXISTS TOKEN;
CREATE TABLE TOKEN(
                      id INTEGER AUTO_INCREMENT,
                      start DATETIME,
                      time INT,
                      end DATETIME,
                      gentoken VARCHAR(255),
                      user INT,
                      primary key (ID)
);

DROP TABLE IF EXISTS USER;
CREATE TABLE USER(
                     id INTEGER AUTO_INCREMENT,
                     token VARCHAR(255),
                     name VARCHAR(255),
                     surname VARCHAR(255),
                     e_mail VARCHAR(255),
                     password VARCHAR(255),
                     verified BOOLEAN,
                     authorization VARCHAR(255),
                     confirm_token VARCHAR(255),
                     semester VARCHAR(2),
                     course VARCHAR(255),
                     primary key (id)
);

INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
    'ABC',
    'Peteasdasdrsen',
    'Sven',
        'sven.asd@hs-osnabrueck.de',
        'petersen',
        false,
        'student',
        'test',
        '4',
        'Wirtschaftsinformatik'
);


INSERT INTO USER( token, name, surname, e_mail, password, verified, authorization, confirm_token, semester, course)
VALUES (
           'DEF',
           'Kottmann',
           'Louis',
           'louis.king@hs-osnabrueck.de',
           'kottmann',
           false,
           'dozent',
           'test',
           '2',
           'Wirtschaftsinformatik'
       );


INSERT INTO TOKEN (start, time, end, gentoken, user)
VALUES (
        '2020-07-11',
        99999999,
        '2020-09-20',
        'ABC',
        1
       );

