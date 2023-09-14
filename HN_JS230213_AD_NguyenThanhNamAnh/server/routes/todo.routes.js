const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../ultils/database");
const cors = require("cors");

const { isAuth } = require("../middlewares/auth.middlewares");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
//get all
router.get("/", async (req, res) => {
  const query = "SELECT * FROM todo";
  try {
    const todos = await db.execute(query);
    res.json({ todos: todos[0] });
  } catch (error) {
    res.json({ error: error });
  }
});

//get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM todo WHERE id = ${id}`;
    const todo = await db.execute(query);
    if (todo[0].length > 0) {
      res.json({ todo: todo[0][0] });
    } else {
      res.json({ error: "todo not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//post
router.post("/", isAuth, async (req, res) => {
  const { name } = req.body;

  try {
    const query = `INSERT INTO todo (name, status) VALUES (?,?)`;
    const result = await db.execute(query, [name, "uncompleted"]);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ message: "create todo success", status: 200 });
    } else {
      res.json({ error: "create todo failed", status: 400 });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//patch

router.put("/:id", isAuth, async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  try {
    let query = `UPDATE todo SET status = ? WHERE id =?`;
    const result = await db.execute(query, [status, id]);
    if (result[0].affectedRows > 0) {
      res.json({ message: "update todo success" });
    } else {
      res.json({ error: "update todo failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//delete
router.delete("/:id", isAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM todo WHERE id = ${id}`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "delete todo success" });
    } else {
      res.json({ error: "delete todo failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
