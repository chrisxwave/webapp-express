const db = require("../db");

// POST nuova recensione
function createReview(req, res, next) {
    const { movie_id, name, vote, text } = req.body;

    db.query(
        "INSERT INTO reviews (movie_id, name, vote, text) VALUES (?, ?, ?, ?)",
        [movie_id, name, vote, text],
        (err, result) => {
            if (err) {
                return next(err);
            }

            res.status(201).json({
                message: "Recensione aggiunta",
                id: result.insertId
            });
        }
    );
}

// PUT modifica recensione
function updateReview(req, res, next) {
    const id = req.params.id;
    const { name, vote, text } = req.body;

    db.query(
        "UPDATE reviews SET name = ?, vote = ?, text = ? WHERE id = ?",
        [name, vote, text, id],
        (err, result) => {
            if (err) {
                return next(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Recensione non trovata"
                });
            }

            res.json({
                message: "Recensione modificata"
            });
        }
    );
}

// DELETE recensione
function deleteReview(req, res, next) {
    const id = req.params.id;

    db.query(
        "DELETE FROM reviews WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return next(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Recensione non trovata"
                });
            }

            res.json({
                message: "Recensione eliminata"
            });
        }
    );
}

module.exports = {
    createReview,
    updateReview,
    deleteReview
};