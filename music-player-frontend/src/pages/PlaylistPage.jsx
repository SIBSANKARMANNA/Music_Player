import { useEffect, useState } from "react";
import {
  getPlaylists,
  createPlaylist,
  removeFromPlaylist,
} from "../api/playlistApi";
import { usePlayer } from "../context/PlayerContext";
import { PlusCircle } from "lucide-react";

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const { playSong } = usePlayer();

  const fetchPlaylists = async () => {
    const res = await getPlaylists();
    setPlaylists(res.data.playlists || []);
  };

  const handleCreate = async () => {
    const name = prompt("Enter playlist name:");
    if (name) {
      await createPlaylist(name);
      fetchPlaylists();
    }
  };

  const handleRemove = async (playlistId, songId) => {
    await removeFromPlaylist(songId, playlistId);
    fetchPlaylists();
  };

  const toggleExpand = (playlistId) => {
    setExpanded((prev) => (prev === playlistId ? null : playlistId));
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div className="p-6 sm:p-10 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          🎧 Playlists
        </h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white px-5 py-2 rounded-lg hover:scale-105 shadow-md transition-transform"
        >
          <PlusCircle size={20} /> Create Playlist
        </button>
      </div>

      {/* Playlist Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {playlists.map((pl) => (
          <div
            key={pl._id}
            onClick={() => toggleExpand(pl._id)}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md p-5 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-lg font-semibold">{pl.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {pl.songs.length} songs
                </p>
              </div>
              <span className="text-gray-400 text-lg">
                {expanded === pl._id ? "▲" : "▼"}
              </span>
            </div>

            {/* Expand Section */}
            {expanded === pl._id && (
              <div className="mt-3 border-t border-gray-300 dark:border-gray-700 pt-3 animate-fadeIn">
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {pl.songs.map((song) => (
                    <li
                      key={song._id}
                      className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-2 rounded-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <p className="font-medium text-sm truncate">
                          {song.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {song.artist}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => playSong(song, pl.songs)}
                          className="text-blue-500 hover:scale-110 transition-transform"
                        >
                          ▶
                        </button>
                        <button
                          onClick={() => handleRemove(pl._id, song._id)}
                          className="text-red-500 hover:scale-110 transition-transform"
                        >
                          ❌
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {pl.songs.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSong(pl.songs[0], pl.songs);
                    }}
                    className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md hover:scale-105 transition-transform"
                  >
                    ▶ Play All
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
