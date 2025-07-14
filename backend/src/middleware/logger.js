const logger = require("../utils/logger");
module.exports = (req, res, next) => {
  const context = {};
  if (Object.keys(req.params).length) context.params = req.params;
  if (Object.keys(req.query).length) context.query = req.query;
  if (Object.keys(req.body).length) context.body = req.body;
  const startTime = process.hrtime();
  const timestamp = new Date();
  res.on("finish", () => {
    const diff = process.hrtime(startTime);
    const totalTimeMs = diff[0] * 1000 + diff[1] / 1e6;
    logger.info({
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      timestamp: timestamp.toISOString(),
      context,
      totalTimeMs,
    });
  });
  next();
};
