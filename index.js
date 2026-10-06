require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());
app.use(express.static("public"));

app.use("/movies", movieRoutes);
app.use("/reviews", reviewRoutes);

// Middleware 404
app.use((req, res) => {
    res.status(404).json({
        error: "Risorsa non trovata"
    });
});


app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Errore interno del server"
    });
});


app.listen(3000, () => {
    console.log("Server avviato sulla porta 3000");
});