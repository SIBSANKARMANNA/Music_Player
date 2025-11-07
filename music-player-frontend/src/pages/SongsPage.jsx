import { useEffect, useState } from "react";
import { getSongs, deleteSong, uploadSong } from "../api/songApi";
import SongCard from "../components/SongCard";

export default function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // form state
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState("");

  const fetchSongs = async () => {
    const res = await getSongs();
    setSongs(res.data);
  };

  const handleDelete = async (id) => {
    await deleteSong(id);
    fetchSongs();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an audio file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("coverImage", coverImage);
    formData.append("file", file);

    await uploadSong(formData);
    setTitle("");
    setArtist("");
    setAlbum("");
    setCoverImage("");
    setFile(null);
    setShowForm(false);
    fetchSongs();
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="p-6 sm:p-10 min-h-screen bg-transparent">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          🎵 My Songs
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          {showForm ? "Close Upload" : "+ Upload Song"}
        </button>
      </div>

      {/* Upload form */}
      {showForm && (
        <form
          onSubmit={handleUpload}
          className="bg-white/60 dark:bg-gray-800/70 backdrop-blur-md shadow-lg rounded-xl p-6 mb-10 space-y-4 transition"
        >
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
            Upload New Song
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              placeholder="Album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Cover Image URL (optional)"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/40 p-2 rounded w-full"
            required
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Upload
          </button>
        </form>
      )}

      {/* Song List */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {songs.map((song) => (
          <SongCard
            key={song._id}
            song={song}
            onDelete={handleDelete}
            allSongs={songs}
          />
        ))}
      </div>
    </div>
  );
}
