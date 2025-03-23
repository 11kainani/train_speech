const request = require("supertest");
const {app} = require("../app");

describe("Subject API Tests", () => {

    let createdSubjectId; 
    it("POST /subject/create - should create a subject", async () => {
        const res = await request(app).post("/subject/create").send({ description: "Test-Subject" }).set('x-api-key', process.env.API_KEY);
        createdSubjectId = res.body.Subject.idSubject;
        expect(res.statusCode).toBe(201);
    });

    it( "POST /subject/create - should fail to create because subject duplicate", async () => {
        const res = await request(app).post("/subject/create").send({ description: "Test-Subject" }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);

    });

    it("POST /subjects - should fail if no description", async () => {
        const res = await request(app).post("/subject/create").send({}).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);
    });

    it("GET /subjects - should fetch subjects", async () => {
        const res = await request(app).get("/subject/all").set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(200);
    });

    it("POST /subjects - should fail if description is too long", async () => {
        const longDescription = "a".repeat(401); // Adjust max length
        const res = await request(app).post("/subject/create").send({ description: longDescription }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);
    });



    
});