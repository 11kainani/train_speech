const request = require("supertest");
const {app} = require("../app");

const maxSizeDescription = 201;
describe("Create Subject - API Tests", () => {


    it("POST /subject/create - should create a subject", async () => {
        const res = await request(app).post("/subject/create").send({ description: "Test_subject" }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(201);
    });

    it( "POST /subject/create - should fail to create because subject duplicate", async () => {
       
        const res = await request(app).post("/subject/create").send({ description: "Test_subject" }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);

    });

    it("POST /subject/create - should fail if no description", async () => {
        const res = await request(app).post("/subject/create").send({}).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);
    });

    it("GET /subject/create - should fetch subjects", async () => {
        const res = await request(app).get("/subject/all").set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(200);
    });

    it("POST /subject/create - should fail if description is too long", async () => {
        const longDescription = "a".repeat(maxSizeDescription); // Adjust max length
        const res = await request(app).post("/subject/create").send({ description: longDescription }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);
    });
});


describe("Prompt Manipulation - API TEST", () => {

    it("POST /subject/prompt/create - should create a prompt", async () => {

        const res = await request(app).post("/subject/prompt/create").send({description: "Prompt Test"}).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(201);
    });

    it("POST /subject/prompt/create - should fail because the description is too long", async () => {
        const longDescription = "b".repeat(maxSizeDescription);
        const res = await request(app).post("/subject/prompt/create").send({ description: longDescription }).set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);

    });

    it("POST /subject/prompt/create - should fail because the description is absent", async () => {
        const res = await request(app).post("/subject/prompt/create").set('x-api-key', process.env.API_KEY);
        expect(res.statusCode).toBe(400);

    });
});