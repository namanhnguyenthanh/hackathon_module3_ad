const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../ultils/database");
const cors = require("cors");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());

router.post("/signin", async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await db.execute(
      "select * from user where email = ? and password = ?",
      [email, password]
    );
    let [row] = result;

    if (row.length > 0) {
      let accessToken = jwt.sign({ data: row[0] }, process.env.TOKEN_SECRET, {
        expiresIn: 60 * 600,
      });
      res.json({ message: "login success", accessToken });
    } else {
      res.json({ error: "login failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
