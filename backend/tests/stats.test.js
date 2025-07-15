const request = require("supertest");
const express = require("express");
const statsRouter = require("../src/routes/stats");
const statsService = require("../src/service/stats");

jest.mock("../src/service/stats", () => ({
  getStats: jest.fn(),
}));

describe("Stats API routes", () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api/stats", statsRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/stats", () => {
    it("should return stats object", async () => {
      const mockStats = { total: 4, averagePrice: 10.5, totalPrice: 42 };
      statsService.getStats.mockResolvedValue(mockStats);
      const res = await request(app).get("/api/stats");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockStats);
    });

    it("should handle internal errors gracefully", async () => {
      statsService.getStats.mockRejectedValue(new Error("Internal error"));
      const res = await request(app).get("/api/stats");
      expect(res.statusCode).toBe(500);
      expect(res.body.errors).toBeDefined();
    });
  });
});
