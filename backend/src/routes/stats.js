const express = require("express");
const router = express.Router();
const { getStats } = require("../service/stats");
const CustomError = require("../CustomError");
const { routeErrorHandler } = require("../middleware/errorHandler");

async function getStatsHandler(req, res) {
  const stats = await getStats();
  res.json(stats);
  // throw new CustomError({msg: "My random error"})
}

// GET /api/stats
router.get("/", routeErrorHandler(getStatsHandler));

module.exports = router;
