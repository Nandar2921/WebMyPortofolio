import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import profile from "../assets/profile.jpg";
import TypewriterText from "./TypewriterText";
import { FaInstagram, FaGithub, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Hero() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const socialLinks = [
    { Icon: FaInstagram, url: "https://www.instagram.com/n_wahyu_n", username: "@n_wahyu_n", color: "hover:text-pink-500" },
    { Icon: FaGithub, url: "https://github.com/Nandar2921", username: "Nandar2921", color: "hover:text-gray-300" },
    { Icon: FaTiktok, url: "https://www.tiktok.com/@santuy.217", username: "@santuy.217", color: "hover:text-white" },
    { Icon: FaWhatsapp, url: "https://wa.me/6288980045976", username: "+62 889-8004-5976", color: "hover:text-green-400" },
    { Icon: HiOutlineMail, url: "mailto:nurwahyunandarudin21@gmail.com", username: "nurwahyunandarudin21@gmail.com", color: "hover:text-purple-400" },
  ];

  // Partikel background
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <section ref={containerRef} id="home" className="relative max-w-7xl mx-auto px-6 md:px-10 pt-32 lg:pt-40 min-h-screen flex items-center overflow-hidden">
      
      {/* BACKGROUND PARTIKEL */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -20, 0, 20, 0],
              x: [0, 15, 0, -15, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
        
        {/* KIRI - TEKS */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 mb-6 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-purple-300 text-sm font-semibold tracking-wider">OPEN FOR OPPORTUNITIES</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Nur
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Wahyu
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-2xl md:text-3xl font-semibold"
          >
            <TypewriterText />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-zinc-400 mt-6 leading-relaxed text-lg max-w-xl"
          >
            Mahasiswa Informatika Universitas Muhammadiyah Semarang. Saat ini sedang 
            aktif membangun portfolio dan mencari pengalaman sebagai <span className="text-purple-400">Web Developer Freelance</span>. 
            Saya terdaftar di <span className="text-cyan-400">Fiverr</span> & <span className="text-cyan-400">Upwork</span>, dan sedang memperluas koneksi di LinkedIn.
          </motion.p>

          {/* STATUS CARD - REALISTIS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-lg">📌</div>
              <div>
                <div className="text-xs text-zinc-500">Status</div>
                <div className="text-sm font-semibold text-purple-400">Building Portfolio</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-lg">🎯</div>
              <div>
                <div className="text-xs text-zinc-500">Looking for</div>
                <div className="text-sm font-semibold text-cyan-400">Freelance Projects</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex gap-5 mt-10 flex-wrap"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="relative overflow-hidden group bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-purple-500/30 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                ✨ See My Projects
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
              </span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="relative overflow-hidden group border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">📬 Hire Me</span>
            </motion.button>
          </motion.div>

          {/* SOCIAL ICONS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex gap-3 mt-10 flex-wrap"
          >
            {socialLinks.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.1 }}
                className={`relative group p-3 rounded-full bg-white/5 border border-white/10 transition-all duration-300 ${item.color}`}
                title={item.username}
              >
                <item.Icon className="text-xl transition-colors" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* KANAN - FOTO PROFIL */}
        <div className="relative flex justify-center items-center">
          <div className="relative group" style={{ perspective: "1500px" }}>
            
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-500/20 to-cyan-600/20 blur-2xl"
            />

            {/* ORBIT RINGS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="absolute -inset-8 rounded-full border-2 border-purple-500/40"
              style={{ borderTopColor: "transparent", borderLeftColor: "transparent" }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="absolute -inset-14 rounded-full border-2 border-cyan-500/30"
              style={{ borderBottomColor: "transparent", borderRightColor: "transparent" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="absolute -inset-20 rounded-full border border-dashed border-pink-500/30"
            />

            {/* FOTO 3D */}
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] h-5 bg-gradient-to-r from-purple-500/30 via-black/50 to-cyan-500/30 rounded-full blur-xl"
              />

              <motion.div
                animate={{ boxShadow: [
                  "0 0 20px rgba(168,85,247,0.3)",
                  "0 0 50px rgba(168,85,247,0.5)",
                  "0 0 30px rgba(6,182,212,0.4)",
                  "0 0 20px rgba(168,85,247,0.3)",
                ] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="rounded-full"
              >
                <img
                  src={profile}
                  alt="Nur Wahyu Nandarudin"
                  className="relative w-[260px] h-[260px] md:w-[380px] md:h-[380px] object-cover rounded-full shadow-2xl transition-all duration-500 group-hover:scale-105"
                  style={{
                    border: "4px solid transparent",
                    backgroundImage: "linear-gradient(#050816, #050816), linear-gradient(135deg, #a855f7, #ec4899, #06b6d4)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/380x380?text=Nur+Wahyu"; }}
                />
              </motion.div>

              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/15 via-transparent to-white/5 pointer-events-none" />

              {/* BADGE */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg z-20"
                style={{ transform: "translateZ(25px)" }}
              >
                <div className="w-3 h-3 rounded-full bg-white" />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -bottom-1 -left-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-1.5 border-2 border-white shadow-md z-20"
                style={{ transform: "translateZ(20px)" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 rounded-full bg-white"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* STATUS CARD */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="absolute -bottom-5 right-5 md:-bottom-10 md:right-10 bg-gradient-to-br from-purple-900/60 to-cyan-900/60 backdrop-blur-2xl border border-purple-500/40 rounded-2xl z-20 shadow-2xl overflow-hidden"
          >
            <div className="relative px-5 py-3">
              <div className="flex items-center gap-2 mb-1">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"
                />
                <span className="text-xs font-bold text-green-400 tracking-wider">OPEN FOR WORK</span>
              </div>
              <p className="text-sm text-white font-medium">🚀 Looking for my first client!</p>
            </div>
          </motion.div>

          {/* MOTTO BADGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="absolute -top-10 left-0 md:-left-10 bg-gradient-to-r from-purple-500 to-cyan-500 px-4 py-2 rounded-r-full rounded-tl-full shadow-xl z-20"
          >
            <span className="text-white text-sm font-semibold">💪 Never Stop Learning</span>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        >
          <span className="text-xs text-zinc-500">Scroll Down</span>
          <div className="w-5 h-8 border-2 border-purple-500/50 rounded-full flex justify-center">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-2 bg-purple-400 rounded-full mt-1" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}