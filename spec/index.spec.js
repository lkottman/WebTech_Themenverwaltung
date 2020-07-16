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


        it("Body Login", () =>{

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
    "http://localhost:3001/register"
    describe("POST /register", () =>{
        jsonRegisterBodyEmpty = { email: '', password: '', checkboxLogin: false };

        //TODO Register

        jsonRegisterBodyUser = {
                token: 'Code',
                name: 'Dominik',
                surname: 'Dziersan',
                email: 'Dominik.Dziersan@hs-osnabrueck.de',
                password: 'Test123E',
                secretToken: '7iekkack0reykg2ppeily'
        };

        it('Status 200', function (done) {
            Request.post("http://localhost:3001/register", {json: true, body: jsonRegisterBodyEmpty}, function (error, response) {
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

