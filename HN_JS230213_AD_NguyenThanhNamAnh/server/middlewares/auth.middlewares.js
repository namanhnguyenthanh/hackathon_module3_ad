const jwt = require("jsonwebtoken");
const db = require("../ultils/database");

module.exports.isAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1].trim();
    let result = jwt.verify(token, process.env.TOKEN_SECRET);

    let user = result.data;

    if (user.role == "admin") {
      next();
    } else {
      res.json({
        message: "not admin",
      });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
