const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Default Playlist",
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song", // reference Song model
    },
  ],
});

module.exports = mongoose.model("Playlist", playlistSchema);
