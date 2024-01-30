const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api/userList", (req, res) => {
    res.json({ message: "" });
});

app.get("/api/userDetail", (req, res) => {
    
    res.json({ message: "" });
});

app.post("/api/userEdit", (req, res) => {
    
    res.json({ message: "" });
});

app.post("/api/userCreate", (req, res) => {
    
    res.json({ message: "" });
});

app.post("/api/userDelete", (req, res) => {
    
    res.json({ message: "" });
});

app.get("/api/newsList", (req, res) => {
    res.json({ message: "" });
});

app.get("/api/newsDetail", (req, res) => {
    
    res.json({ message: "" });
});

app.listen(PORT, () => {
  console.log(`Server port: ${PORT}`);
});