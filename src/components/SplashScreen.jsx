import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export default function SplashScreen({ onComplete, audioRef }) {
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const voiceEnRef = useRef(null);
  const voiceIdRef = useRef(null);

  const startEverything = () => {
    if (started) return;
    setStarted(true);

    // Mulai musik
    if (audioRef?.current) {
      audioRef.current.volume = 0.35;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Music error:", err));
    }

    // Mulai voice
    voiceEnRef.current = new Audio('SuaraAi 1.mp3');
    voiceIdRef.current = new Audio('SuaraAi 2.mp3');
    voiceEnRef.current.volume = 0.9;
    voiceIdRef.current.volume = 0.9;
    voiceEnRef.current.onended = () => voiceIdRef.current.play();
    voiceEnRef.current.play().catch((e) => console.log("Voice error:", e));

    // Progress bar
    let step = 0;
    const duration = 10000;
    const intervalTime = 30;
    const steps = duration / intervalTime;

    const interval = setInterval(() => {
      step++;
      const newProgress = Math.min(100, Math.floor((step / steps) * 100));
      setProgress(newProgress);
      if (newProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, intervalTime);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#050816] to-purple-900"
        onClick={startEverything}
      >
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
            <p className="text-zinc-300 text-lg md:text-xl mb-2">Nur Wahyu Nandarudin</p>
            <p className="text-purple-400 text-sm md:text-base">Web Developer & Content Creator</p>
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
            transition={{ delay: 0.8 }}
            className="text-zinc-500 text-xs md:text-sm italic max-w-md mx-auto"
          >
            "Coding is my passion, creativity is my weapon"
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 w-64 md:w-80"
          >
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>Loading experience</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
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
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                className="w-1.5 h-1.5 bg-purple-400 rounded-full"
              />
            ))}
          </motion.div>

          {!started && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              onClick={startEverything}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-lg hover:scale-105 transition shadow-lg"
            >
              🎧 ENTER PORTFOLIO
            </motion.button>
          )}

          {/* FIX: typo "Welome" → "Welcome" */}
          {started && progress < 45 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-purple-400/60 text-[10px] flex items-center justify-center gap-1"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
              </span>
              🎙️ Welcome
            </motion.p>
          )}
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
