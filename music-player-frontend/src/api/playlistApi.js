import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getPlaylists = () => API.get("/playlist");
export const createPlaylist = (name) => API.post("/playlist/create", { name });
export const addToPlaylist = (songId, playlistId) =>
  API.post("/playlist", { songId, playlistId });
export const removeFromPlaylist = (songId, playlistId) =>
  API.delete(`/playlist/${playlistId}/${songId}`);
