const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(403).send({ message: "No token provided!" });
    jwt.verify(token, "7dho8TA5Ax9wMXgHCZrWzj2czAp6C5iH", (err, decoded) => {
      if (err)
        return res.status(403).send({ message: "Forbidden! Invalid token" });
      req.id = decoded.id;
      next();
    });
  } else {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};
module.exports = verifyToken;
