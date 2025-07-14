const express = require("express");
const fs = require("fs");
const router = express.Router();
const { DATA_PATH } = require("../constants");
const { recalculateStats } = require("../service/stats");
const validateBody = require("../middleware/validateBody");
const { createItem: createItemValidator } = require("../validators/index");
const { routeErrorHandler } = require("../middleware/errorHandler");

// Utility to read data (now async)
async function readData() {
  const raw = await fs.promises.readFile(DATA_PATH);
  return JSON.parse(raw);
}

async function getItems(req, res, next) {
  const data = await readData();
  const { limit = 3, q, page = 1 } = req.query;
  let results = data;
  const start = (page - 1) * limit;
  const end = start + parseInt(limit);
  if (q) {
    results = results.filter((item) =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }
  let totalItems = results.length;

  if (limit) {
    results = results.slice(start, end);
  }
  res.json({ results, totalItems });
}

async function getItemById(req, res, next) {
  const data = await readData();
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(item);
}

async function createItem(req, res) {
  const item = req.body;
  const data = await readData();
  item.id = Date.now();
  data.push(item);
  await fs.promises.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  recalculateStats();
  res.status(201).json(item);
}

// GET /api/items
router.get("/", routeErrorHandler(getItems));
// GET /api/items/:id
router.get("/:id", routeErrorHandler(getItemById));
// POST /api/items
router.post(
  "/",
  routeErrorHandler(validateBody(createItemValidator)),
  routeErrorHandler(createItem)
);

module.exports = router;
