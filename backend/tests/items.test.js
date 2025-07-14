const request = require("supertest");
const express = require("express");
const itemsRouter = require("../src/routes/items");
const fs = require("fs");
const { DATA_PATH } = require("../src/constants");

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));
jest.mock("../src/service/stats", () => ({ recalculateStats: jest.fn() }));

const mockData = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Carrot" },
  { id: 4, name: "Date" }
];

describe("Items API routes", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/items", itemsRouter);
    fs.promises.readFile.mockResolvedValue(JSON.stringify(mockData));
    fs.promises.writeFile.mockResolvedValue();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/items", () => {
    it("should return all items with default limit", async () => {
      const res = await request(app).get("/api/items");
      expect(res.statusCode).toBe(200);
      expect(res.body.results.length).toBe(3); // default limit is 3
      expect(res.body.totalItems).toBe(4);
      expect(res.body.results[0].name).toBe("Apple");
    });

    it("should return items with custom limit and page", async () => {
      const res = await request(app).get("/api/items?limit=2&page=2");
      expect(res.statusCode).toBe(200);
      expect(res.body.results.length).toBe(2);
      expect(res.body.results[0].name).toBe("Carrot");
      expect(res.body.totalItems).toBe(4);
    });

    it("should filter items by query", async () => {
      const res = await request(app).get("/api/items?q=ban");
      expect(res.statusCode).toBe(200);
      expect(res.body.results.length).toBe(1);
      expect(res.body.results[0].name).toBe("Banana");
      expect(res.body.totalItems).toBe(1);
    });

    it("should return empty results if query does not match", async () => {
      const res = await request(app).get("/api/items?q=zzz");
      expect(res.statusCode).toBe(200);
      expect(res.body.results.length).toBe(0);
      expect(res.body.totalItems).toBe(0);
    });

    it("should handle limit=0 gracefully", async () => {
      const res = await request(app).get("/api/items?limit=0");
      expect(res.statusCode).toBe(200);
      expect(res.body.results.length).toBe(0);
      expect(res.body.totalItems).toBe(4);
    });
  });

  describe("GET /api/items/:id", () => {
    it("should return item by id", async () => {
      const res = await request(app).get("/api/items/2");
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe("Banana");
    });

    it("should return 404 if item not found", async () => {
      const res = await request(app).get("/api/items/999");
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe("Item not found");
    });
  });

  describe("POST /api/items", () => {
    it("should create a new item and return it", async () => {
      const newItem = { "name": "Mouse", "category": "Electronics", "price": 1000 };
      const res = await request(app)
        .post("/api/items")
        .send(newItem)
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe("Mouse");
      expect(res.body.id).toBeDefined();
    });

    it("should fail validation for missing name", async () => {
      const res = await request(app)
        .post("/api/items")
        .send({})
        .set("Content-Type", "application/json");
      expect(res.statusCode).toBe(400);
      
    });
  });
});