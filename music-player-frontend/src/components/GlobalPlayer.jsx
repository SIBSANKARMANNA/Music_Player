import { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react";

export default function GlobalPlayer() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    changeVolume,
    audioRef,
  } = usePlayer();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [audioRef]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  if (!currentSong) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/10 dark:bg-gray-800/70 
                 text-gray-900 dark:text-white border-t border-gray-300/30 dark:border-gray-700 
                 p-4 flex items-center gap-4 justify-between shadow-xl"
    >
      <div className="flex items-center gap-3 w-1/3">
        <img
          src={currentSong.coverImage || "https://via.placeholder.com/50"}
          alt="cover"
          className="w-12 h-12 object-cover rounded-lg shadow"
        />
        <div>
          <h2 className="font-semibold">{currentSong.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentSong.artist}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-1/3 justify-center">
        <button
          onClick={prevSong}
          className="hover:scale-110 transition-transform"
        >
          <SkipBack size={28} />
        </button>
        <button
          onClick={togglePlay}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition"
        >
          {isPlaying ? <Pause size={26} /> : <Play size={26} />}
        </button>
        <button
          onClick={nextSong}
          className="hover:scale-110 transition-transform"
        >
          <SkipForward size={28} />
        </button>
      </div>

      <div className="flex items-center gap-4 w-1/3 justify-end">
        <input
          type="range"
          value={progress}
          onChange={handleSeek}
          className="w-1/2 accent-blue-500 cursor-pointer"
        />
        <Volume2 size={22} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={(e) => changeVolume(parseFloat(e.target.value))}
          className="w-24 accent-blue-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
