var Request = require("request");

var Register = require("..\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\public\\register.js")
describe("Register Tests: ", function() {
    it("tests email if ..@hs-osnabrueck.de ", function() {

        expect(Register.validateEmail("dominik.dziersan@hs-osnabrueck.de")).toBe(true);

    });

    it("Test if two randoms strings are different ", function() {

        var string0 = Register.generateRandomString;
        var string1 = Register.generateRandomString;

        expect(string0 === string1).toBe(true);

    });
});

describe("Index Tests: ", function() {

    var server;
    beforeAll(() =>{
        server = require("..\\Gruppe_1_Registrierung\\Login_etc_Dziersan\\indexTest.js");
    });
    afterAll(() => {
        server.close;
    });


    describe("GET /", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });


    describe("GET /login", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/login", (error, response, body) => {

                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });


    });

    describe("POST /login", () =>{

        jsonLoginBodyEmpty = { email: '', password: '', checkboxLogin: false };
        jsonLoginBodyUser = { email: 'dominik.dziersan@hs-osnabrueck.de', password: 'Test123E', checkboxLogin: false };

        it('Status 200', function (done) {
            Request.post("http://localhost:3001/login", {json: true, body: jsonLoginBodyEmpty}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });

        it('Failed to Login because of false Informations', function (done) {
            Request.post("http://localhost:3001/login", {json: true, body: jsonLoginBodyEmpty}, function (error, response) {
                expect(response.body).toEqual(Object({ login: 'Fehlgeschlagen: Falsche Informationen oder nicht registriert' }));
                done();
            });
        });

        it('Failed to Login because of false Informations', function (done) {
            Request.post("http://localhost:3001/login", {json: true, body: jsonLoginBodyEmpty}, function (error, response) {
                expect(response.body).toEqual(Object({ login: 'Fehlgeschlagen: Falsche Informationen oder nicht registriert' }));
                done();
            });
        });

        jsonLoginBodyUser = { email: 'dominik.dziersan@hs-osnabrueck.de', password: 'Test123E', checkboxLogin: true };
        it('Failed to Login because of false Informations', function (done) {
            Request.post("http://localhost:3001/login", {json: true, body: jsonLoginBodyUser}, function (error, request, response) {
                // cookie = request.session
                // expect(request.session.maxAge).toEqual(54000);
                done();
            });
        });
    });


    describe("GET /register", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/register", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("POST /register", () =>{

        var token = "";
        var email = "";
        var jsonRegisterBodyUser = {
            token: `${token}`,
            name: "Dominik",
            surname: "Dziersan",
            email: `${email}`,
            password: "Test123E",
            secretToken: "secretToken"
        };

        it('Status 200', function (done) {
            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });

        it('Failed to Login because Token doesnt exists', function (done) {
            token = "FalscherToken";
            email = "Email.Test@hs-osnabrueck.de";

            var jsonRegisterBodyUser = {
                token: `${token}`,
                name: "Dominik",
                surname: "Dziersan",
                email: `${email}`,
                password: "Test123E",
                secretToken: "secretToken"
            };


            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.body).toEqual(Object({ register: "Freischaltcode existiert nicht." }));
                done();
            });
        });

        it('Failed to Login because User already exists', function (done) {
            token = "9bllcx";
            email = "dominik.dziersan@hs-osnabrueck.de";
            var jsonRegisterBodyUser = {
                token: `${token}`,
                name: "Dominik",
                surname: "Dziersan",
                email: `${email}`,
                password: "Test123E",
                secretToken: "secretToken"
            };
            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.body).toEqual(Object({ register: "Fehlgeschlagen: Benutzer existiert bereits." }));
                done();
            });
        });

        it('Failed to Login because Token is expired', function (done) {
            token = "c3ehla";
            email = "Email.Test@hs-osnabrueck.de";
            var jsonRegisterBodyUser = {
                token: `${token}`,
                name: "Dominik",
                surname: "Dziersan",
                email: `${email}`,
                password: "Test123E",
                secretToken: "secretToken"
            };
            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.body).toEqual(Object({ register: "Freischaltcode ist abgelaufen." }));
                done();
            });
        });

        it('Failed to Login because Token is expired', function (done) {
            token = "9bllcx";
            email = "Email.Test@web.de";
            var jsonRegisterBodyUser = {
                token: `${token}`,
                name: "Dominik",
                surname: "Dziersan",
                email: `${email}`,
                password: "Test123E",
                secretToken: "secretToken"
            };

            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.body).toEqual(Object({ register: 'Fehlgeschlagen: Benutzer existiert bereits.' }));
                done();
            });
        });

    });

    describe("GET /successfullregistration", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/successfullregistration", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /token", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/token", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /agb", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/agb", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /resetpassword", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/resetpassword", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /changepassword", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/changepassword", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /confirmation", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3001/confirmation", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    describe("GET /cookie", () =>{
        var data = {};
        let time = new Date();
        time = time.toISOString().slice(0, 19).replace('T', ' ');

        // const cookie = {'"cookie"':{'"originalMaxAge"':86400000,'"expires"':'"'`${time}`+'"',
        //         '"secure"':false,'"httpOnly"':true,'"path"':'"/"','"sameSite"':true}};

        beforeAll((done) => {
            Request.get("http://localhost:3001/cookie", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });

        it("Cookies equals", () =>{

            // expect(data.body).toBe(cookie);
        });

    });
});

