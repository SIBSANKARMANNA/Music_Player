const express = require("express");
const { getPlaylist, addToPlaylist, removeFromPlaylist,createPlaylist } = require("../controllers/playlistController");

const router = express.Router();

router.get("/", getPlaylist);
router.post("/", addToPlaylist);
router.delete("/:songId/:playlistId", removeFromPlaylist);
router.post("/create", createPlaylist);

module.exports = router;
