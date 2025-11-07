// controllers/songController.js
const Song = require("../models/Song");

// =======================
// GET all songs
// =======================
const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();   // ✅ need await
    res.status(200).json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ message: "Error fetching songs" });
  }
};

// =======================
// POST add a song
// =======================
const addSong = async (req, res) => {
  try {
    const { title, artist, album, coverImage } = req.body;

    // multer stores file info in req.file
    const filePath = req.file ? req.file.path : null;

    const newSong = await Song.create({
      title,
      artist,
      album,
      filePath,
      coverImage,
    });

    res.status(201).json({ message: "Song added", song: newSong });
  } catch (error) {
    console.error("Error adding song:", error);
    res.status(500).json({ message: "Error adding song" });
  }
};

// =======================
// DELETE a song
// =======================
const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Song.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.json({ message: "Song deleted", song: deleted });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({ message: "Error deleting song" });
  }
};

module.exports = { getSongs, addSong, deleteSong };

