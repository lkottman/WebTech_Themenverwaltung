/**
 * Version 1.0
 * 23.07.2020
 * AUTHOR: Dominik Dziersan
 * @class Tests for login, register and simple functions
 */

var Request = require("request");
const serverURL = "http://localhost:3000";
const Register = require("..\\Gruppe_1_Registrierung\\public\\routes\\register\\routesRegister.js");
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

/**
 * @method
 * beforeAll
 */
describe("Index Tests: ", function() {

    var server;

    beforeAll(() =>{

        server = require("../index");

        var cookie = {
            cookie: true,
        };
        Request.post("http://localhost:3000/enableCookies", {json: true, body: cookie}, function (error, response) {
            done();
        });
    });
    afterAll(() => {
        server.close;
    });

    /**
     * @method
     * GET connection status 200 test
     */
    describe("GET /", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/", (error, response, body) => {
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
            Request.get("http://localhost:3000/login", (error, response, body) => {

                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    /**
     * @method
     * POST /login test
     */
    describe("POST /login", () =>{

        const jsonLoginBodyEmpty = { email: '', password: '', checkboxLogin: false };
        const jsonLoginBodyUser = { email: 'dominik.dziersan@hs-osnabrueck.de', password: 'Test123E', checkboxLogin: false };
        const jsonLoginBodyUserLong = { email: 'dominik.dziersan@hs-osnabrueck.de', password: 'Test123E', checkboxLogin: true };

        it('Status 200', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyEmpty}, function (error, response) {
                expect(response.statusCode).toEqual(200);
                done();
            });
        });

        it('Failed to Login because of false Informations', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyEmpty}, function (error, response) {
                expect(response.body).toEqual(Object({ login: 'Fehlgeschlagen: Falsche Informationen oder nicht registriert' }));
                done();
            });
        });

        it('Login worked', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUser}, function (error, request, response) {
                expect(response.body).toEqual(Object({ login: 'success' }));
                done();
            });
        });

        it('Login worked with Login saved', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUserLong}, function (error, request, response) {
                expect(response.body).toEqual(Object({ login: 'success' }));
                done();
            });
        });

        it('Cookies expiration', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUser}, function (error, request, response) {
                expect(response.session.maxAge).toEqual(86400000);
                done();
            });
        });

        it('Cookies expiration when login saved', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUserLong}, function (error, request, response) {
                expect(response.session.maxAge).toEqual(315360000000);
                done();
            });
        });
    });

    /**
     * @method
     * POST /login & /createToken test
     */
    describe("POST /login & /createToken", () =>{

        const jsonLoginBodyUser = { email: 'dominik.dziersan@hs-osnabrueck.de', password: 'Test123E', checkboxLogin: false };
        const createTokenSuccess = {"start":"2020-07-21 19:28:01","time":null,"end":"2020-07-21 19:28:01","token":"pc6vkg"};
        const createTokenFails = {"start":"2020-07-21 19:28:01","time":null,"end":"2040-07-21 19:28:01","token":"pc6vkg"};

        it('Create token from now until the specified time ', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUser}, function (error, response) {
            });


            Request.post("http://localhost:3000/token", {json: true, body: createTokenSuccess}, function (error, response) {
                expect(response.body).toEqual(Object({ token: "Freischaltcode wurde erstellt." }));
                done();
            });
        });

        it('Fails to create token because of a time which is to long ', function (done) {
            Request.post("http://localhost:3000/login", {json: true, body: jsonLoginBodyUser}, function (error, response) {
            });


            Request.post("http://localhost:3000/token", {json: true, body: createTokenFails}, function (error, response) {
                expect(response.body).toEqual(Object({ token: "Fehler: Die Dauer vom Freischaltcode ist zu lang gewählt." }));
                done();
            });
        });



    });



    describe("GET /register", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/register", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });
    });

    /**
     * @method
     * POST /register test
     */
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
            Request.post("http://localhost:3000/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
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


            Request.post("http://localhost:3000/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
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
            Request.post("http://localhost:3000/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
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
            Request.post("http://localhost:3000/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
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

            Request.post("http://localhost:3000/register", {json: true, body: jsonRegisterBodyUser}, function (error, response) {
                expect(response.body).toEqual(Object({ register: 'Fehlgeschlagen: Benutzer existiert bereits.' }));
                done();
            });
        });

    });

    describe("GET /successfullregistration", () =>{
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:3000/successfullregistration", (error, response, body) => {
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
            Request.get("http://localhost:3000/token", (error, response, body) => {
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
            Request.get("http://localhost:3000/agb", (error, response, body) => {
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
            Request.get("http://localhost:3000/resetpassword", (error, response, body) => {
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
            Request.get("http://localhost:3000/changepassword", (error, response, body) => {
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
            Request.get("http://localhost:3000/confirmation", (error, response, body) => {
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
            Request.get(`http://localhost:3000/cookie`, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;

                done();
            });
        });
        it("Status 200", () =>{
            expect(data.status).toBe(200);
        });

        it("Cookies equals", () =>{

        });

    });
});

