const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "hackathon_bs",
  host: "localhost",
  user: "root",
  password: "12345678",
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});

module.exports = pool.promise();
