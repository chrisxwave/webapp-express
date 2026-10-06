const db = require("../db");

// GET tutti i film
function getMovies(req, res, next) {
    db.query("SELECT * FROM movies", (err, results) => {
        if (err) {
            return next(err);
        }

        res.json(results);
    });
}

// GET singolo film + recensioni
function getMovieById(req, res, next) {
    const id = req.params.id;

    db.query(
        "SELECT * FROM movies WHERE id = ?",
        [id],
        (err, movieResults) => {
            if (err) {
                return next(err);
            }

            if (movieResults.length === 0) {
                return res.status(404).json({
                    error: "Film non trovato"
                });
            }

            db.query(
                "SELECT * FROM reviews WHERE movie_id = ?",
                [id],
                (err, reviewResults) => {
                    if (err) {
                        return next(err);
                    }

                    res.json({
                        movie: movieResults[0],
                        reviews: reviewResults
                    });
                }
            );
        }
    );
}

module.exports = {
    getMovies,
    getMovieById
};