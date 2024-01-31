const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DBNAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.use('/',express.static('../build/')); 

app.get("/api/userList", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','GET');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var sql = "SELECT `id`, `name`, `email` FROM users;";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.get("/api/userDetail", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','GET');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var sql = "SELECT `id`, `name`, `email` FROM users WHERE id = '"+req.query.id+"';";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.post("/api/userEdit", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var sql = "UPDATE users SET `name` = '"+req.query.name+"', `email` = '"+req.query.email+"' WHERE id = '"+req.query.id+"';";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.post("/api/userCreate", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    
    var sql = "INSERT INTO users (`id`,`name`,`email`,`password`) VALUES(null,'"+req.query.name+"','"+req.query.email+"',SHA('"+req.query.password+"'));";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.post("/api/userDelete", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','POST');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    
    var sql = "DELETE FROM users WHERE id = '"+req.query.id+"';";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.get("/api/newsList", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','GET');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var sql = "SELECT `id`, `title`, `extract`, `image` FROM news;";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.get("/api/newsDetail", (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  res.setHeader('Access-Control-Allow-Methods','GET');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
    var sql = "SELECT `id`, `title`, `extract`, `content`, `image` FROM news WHERE id = '"+req.query.id+"';";
    var query_result = "";
    con.query(sql, function (err, result) {
        if (err) throw err;
        query_result = result;
        
        res.json({ message: "ok" , data: query_result});
      });
});

app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});