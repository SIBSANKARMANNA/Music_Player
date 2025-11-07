import { usePlayer } from "../context/PlayerContext";

export default function PlayerControls() {
  const { currentSong, isPlaying, setIsPlaying, audioRef } = usePlayer();

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex gap-4 items-center p-4 bg-gray-800 text-white rounded-xl">
      <button onClick={togglePlay}>
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
      {currentSong && <span>{currentSong.title} - {currentSong.artist}</span>}
      <audio ref={audioRef} src={currentSong?.filePath} />
    </div>
  );
}
