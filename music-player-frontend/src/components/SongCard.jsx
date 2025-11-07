import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import { getPlaylists, addToPlaylist } from "../api/playlistApi";

export default function SongCard({ song, onDelete, allSongs }) {
  const { playSong } = usePlayer();
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getPlaylists();
      setPlaylists(res.data.playlists || []);
    };
    fetch();
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    await addToPlaylist(song._id, playlistId);
    alert(`Added to ${playlists.find((pl) => pl._id === playlistId)?.name}`);
    setOpen(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md 
             rounded-xl p-4 flex items-center justify-between transition hover:scale-[1.02] 
             hover:shadow-xl cursor-pointer relative backdrop-blur-sm">
      <div>
        <h3 className="font-semibold">{song.title}</h3>
        <p className="text-sm text-gray-500">{song.artist}</p>
      </div>

      {/* Dropdown trigger */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="px-2 py-1 rounded hover:bg-gray-200"
        >
          ⋮
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-black-400 border rounded shadow-lg z-10">
            <button
              onClick={() => {
                playSong(song, allSongs);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              ▶️ Play
            </button>

            <button
              onClick={() => {
                onDelete(song._id);
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              🗑 Delete
            </button>

            <div className="border-t">
              <p className="px-4 py-2 text-sm text-gray-500">Add to Playlist</p>
              {playlists.map((pl) => (
                <button
                  key={pl._id}
                  onClick={() => handleAddToPlaylist(pl._id)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {pl.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
