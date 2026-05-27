import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicPlayer({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  // Update status dari audioRef
  useEffect(() => {
    if (!audioRef?.current) return;

    const audio = audioRef.current;
    
    const updatePlayStatus = () => {
      setIsPlaying(!audio.paused);
    };

    // Set initial status
    updatePlayStatus();

    audio.addEventListener('play', updatePlayStatus);
    audio.addEventListener('pause', updatePlayStatus);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('play', updatePlayStatus);
      audio.removeEventListener('pause', updatePlayStatus);
    };
  }, [audioRef]);

  const togglePlay = () => {
    if (audioRef?.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play error:", e));
      }
    }
  };

  const toggleMute = () => {
    if (audioRef?.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowPlayer(!showPlayer)}
        className="fixed bottom-8 left-8 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition hover:scale-110"
        aria-label="Music Player"
      >
        🎵
      </button>

      {showPlayer && (
        <div className="fixed bottom-24 left-8 z-50 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-4 items-center shadow-2xl">
          <button
            onClick={togglePlay}
            className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition hover:scale-110"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          
          <button
            onClick={toggleMute}
            className="bg-zinc-800 text-white p-3 rounded-full hover:bg-zinc-700 transition hover:scale-110"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          
          <div className="text-white text-sm">
            {isPlaying ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Now Playing
              </span>
            ) : (
              "Paused"
            )}
          </div>
        </div>
      )}
    </>
  );
}