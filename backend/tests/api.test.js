const request = require("supertest");
const app = require("../index");

describe("GET /add/:a/:b", () => {
  test("10 + 5 = 15",  async () => {
    const res = await request(app).get("/add/10/5");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(2);
  });
  test("-3 + 7 = 4", async () => {
    const res = await request(app).get("/add/-3/7");
    expect(res.body.result).toBe(4);
  });
});

describe("GET /subtract/:a/:b", () => {
  test("10 - 5 = 5", async () => {
    const res = await request(app).get("/subtract/10/5");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });
  test("3 - 7 = -4", async () => {
    const res = await request(app).get("/subtract/3/7");
    expect(res.body.result).toBe(-4);
  });
});

describe("GET /multiply/:a/:b", () => {
  test("4 * 3 = 12", async () => {
    const res = await request(app).get("/multiply/4/3");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(12);
  });
  test("9 * 0 = 0", async () => {
    const res = await request(app).get("/multiply/9/0");
    expect(res.body.result).toBe(0);
  });
});

describe("GET /divide/:a/:b", () => {
  test("10 / 2 = 5", async () => {
    const res = await request(app).get("/divide/10/2");
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });
  test("division par zéro → 400", async () => {
    const res = await request(app).get("/divide/5/0");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Division par zéro impossible");
  });
});
