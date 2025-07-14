// Utility intentionally unused by routes (candidate should refactor)
function getAverageAndTotalPrice(arr) {
  const total = arr.reduce((a, b) => a + b.price, 0);

  return { average: total / arr.length, total };
}

module.exports = { getAverageAndTotalPrice };
