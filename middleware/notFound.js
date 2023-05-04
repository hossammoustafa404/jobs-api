const notFoundMiddleware = (req, res) =>
  res.json({ msg: "This route does not exist." });

module.exports = notFoundMiddleware;
