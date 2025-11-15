import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(new Audio());

  const playSong = (song, songList = []) => {
    setCurrentSong(song);
    setQueue(songList);
    const audio = audioRef.current;
    audio.src = song.filePath ? `https://music-player-nnqm.onrender.com/${song.filePath}` : song.url;
    audio.play();
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex((s) => s._id === currentSong._id);
    if (idx < queue.length - 1) playSong(queue[idx + 1], queue);
  };

  const prevSong = () => {
    if (!currentSong || queue.length === 0) return;
    const idx = queue.findIndex((s) => s._id === currentSong._id);
    if (idx > 0) playSong(queue[idx - 1], queue);
  };

  const changeVolume = (val) => {
    const audio = audioRef.current;
    audio.volume = val;
    setVolume(val);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        playSong,
        togglePlay,
        nextSong,
        prevSong,
        changeVolume,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
