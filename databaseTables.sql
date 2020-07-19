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

