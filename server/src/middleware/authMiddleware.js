const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "No Token Provided",
      });
    }

    const decoded = jwt.verify(
      token,
      "mysecretkey"
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;