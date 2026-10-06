const express = require("express");

const router = express.Router();

const {
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/reviewController");

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;