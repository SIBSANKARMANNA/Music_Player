const express = require("express");
const { getSongs, addSong, deleteSong } = require("../controllers/songController");
const upload = require("../middleware/upload");

const router = express.Router();

// GET all songs
router.get("/", getSongs);

// POST add a song
router.post("/",upload.single("file"), addSong);

// DELETE a song
router.delete("/:id", deleteSong);

module.exports = router;
