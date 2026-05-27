import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete, audioRef }) {
  const [progress, setProgress] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Fungsi untuk memulai musik
  const startMusic = () => {
    if (audioRef?.current && !musicPlaying) {
      audioRef.current.volume = 0.5;
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("✅ Music started successfully!");
            setMusicPlaying(true);
          })
          .catch(error => {
            console.log("⚠️ Autoplay blocked:", error);
            // Coba lagi setiap 1 detik
            const retryInterval = setInterval(() => {
              if (audioRef?.current && !musicPlaying) {
                audioRef.current.play()
                  .then(() => {
                    console.log("✅ Music started on retry!");
                    setMusicPlaying(true);
                    clearInterval(retryInterval);
                  })
                  .catch(() => {});
              }
            }, 1000);
            
            setTimeout(() => clearInterval(retryInterval), 10000);
          });
      }
    }
  };

  // Coba autoplay saat komponen mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startMusic();
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Progress bar
  useEffect(() => {
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let step = 0;
    let interval = null;

    const startProgress = () => {
      if (interval) clearInterval(interval);
      
      interval = setInterval(() => {
        step++;
        const newProgress = Math.min(100, Math.floor((step / steps) * 100));
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }, intervalTime);
    };

    if (musicPlaying) {
      startProgress();
    } else {
      const waitTimer = setTimeout(() => {
        if (!musicPlaying) {
          console.log("⏰ Timeout waiting for music, continuing anyway...");
          startProgress();
        }
      }, 5000);
      
      return () => clearTimeout(waitTimer);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [musicPlaying, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#050816] via-purple-900/50 to-[#050816]"
        onClick={startMusic}
      >
        {/* HAPUS <audio> element disini! Karena sudah ada di App.jsx */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <span className="text-5xl font-black text-white">NW</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-black mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome to My Portfolio
            </h1>
            <p className="text-zinc-300 text-lg md:text-xl mb-2">
              Nur Wahyu Nandarudin
            </p>
            <p className="text-purple-400 text-sm md:text-base">
              Web Developer & Content Creator
            </p>
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto my-5 rounded-full"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-zinc-500 text-xs md:text-sm italic max-w-md mx-auto"
          >
            "Coding is my passion, creativity is my weapon"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 w-56 md:w-72"
          >
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>
                {musicPlaying ? "Loading experience" : "Waiting for music..."}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-5 flex gap-1 justify-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6,
                  delay: i * 0.15,
                }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            ))}
          </motion.div>

          {!musicPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              onClick={startMusic}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white text-sm font-semibold hover:scale-105 transition shadow-lg"
            >
              🎵 Click to Start Music
            </motion.button>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-6 text-zinc-600 text-[10px] flex items-center justify-center gap-1"
          >
            <span className={`${musicPlaying ? 'animate-pulse text-green-400' : 'text-zinc-500'}`}>
              🎵
            </span>
            {musicPlaying ? 'Background music playing' : 'Click anywhere to start music'}
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-6 text-zinc-700 text-[10px]"
        >
          Experience the journey
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}