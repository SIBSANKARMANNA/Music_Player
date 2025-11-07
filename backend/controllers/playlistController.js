const Playlist = require("../models/Playlist");

// Create a new playlist
const createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;

    // Create new playlist
    const playlist = new Playlist({
      name: name || "New Playlist",
      songs: [],
    });

    await playlist.save();

    res.status(201).json({ message: "Playlist created successfully", playlist });
  } catch (error) {
    console.error("Error creating playlist", error);
    res.status(500).json({ message: "Error creating playlist" });
  }
};


const getPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs"); // 👈 fetch all
    if (!playlists || playlists.length === 0) {
      return res.json({ playlists: [] });
    }
    res.json({ playlists });
  } catch (error) {
    console.error("Error fetching playlists", error);
    res.status(500).json({ message: "Error fetching playlists" });
  }
};





// Add song to playlist
const addToPlaylist = async (req, res) => {
  try {
    const { songId, playlistId } = req.body;

    let playlist = playlistId
      ? await Playlist.findById(playlistId)
      : await Playlist.findOne();

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json({ message: "Song added to playlist", playlist });
  } catch (error) {
    res.status(500).json({ message: "Error adding to playlist" });
  }
};

// Remove song from playlist
const removeFromPlaylist = async (req, res) => {
  try {
    const { songId, playlistId } = req.params;

    const playlist = playlistId
      ? await Playlist.findById(playlistId)
      : await Playlist.findOne();

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs = playlist.songs.filter(
      (song) => song && song.toString() !== songId.toString()
    );

    await playlist.save();

    res.json({ message: "Song removed from playlist", playlist });
  } catch (error) {
    res.status(500).json({ message: "Error removing from playlist" });
  }
};

module.exports = {
  createPlaylist,
  getPlaylist,
  addToPlaylist,
  removeFromPlaylist,
};
