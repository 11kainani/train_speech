const request = require("supertest");
const {app} = require("../app");

const maxSizeDescription = 201;
describe("Create Subject - API Tests", () => {


    it("POST /subjects/ - should create a subject", async () => {
        const res = await request(app).post("/subjects/").send({ description: "Test_subject" }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(201);
    });

    it( "POST /subjects/ - should fail to create because subject duplicate", async () => {
       
        const res = await request(app).post("/subjects/").send({ description: "Test_subject" }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(409);

    });

    it("POST /subjects/ - should fail if no description", async () => {
        const res = await request(app).post("/subjects/").send({}).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);
    });

    it("GET /subjects/ - should fetch subjects ", async () => {
        const res = await request(app).get("/subjects/").set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(200);
    });

    it("POST /subjects/ - should fail if description is too long", async () => {
        const longDescription = "a".repeat(maxSizeDescription); // Adjust max length
        const res = await request(app).post("/subjects/").send({ description: longDescription }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(422);
    });
});

