const fs = require("fs/promises");
const { DATA_PATH } = require("../constants");
const { getAverageAndTotalPrice } = require("../utils/stats");
module.exports = (function () {
  const stats = {};
  async function recalculateStats() {
    const raw = await fs.readFile(DATA_PATH);
    const items = JSON.parse(raw);
    stats.total = items.length;
    let { average, total } = getAverageAndTotalPrice(items);
    stats.averagePrice = parseFloat(average.toFixed(2));
    stats.totalPrice = total;
  }
  async function getStats() {
    return { ...stats };
  }

  recalculateStats();
  return { recalculateStats, getStats };
})();
