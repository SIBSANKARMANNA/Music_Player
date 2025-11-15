import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000/api" });
const API = axios.create({ baseURL: "https://music-player-nnqm.onrender.com/api" });

export const getSongs = () => API.get("/songs");
export const uploadSong = (formData) =>
  API.post("/songs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteSong = (id) => API.delete(`/songs/${id}`);
