import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUserGraduate, FaLaptopCode, FaBriefcase, FaHeart } from "react-icons/fa";

export default function About() {
  const [settings, setSettings] = useState({
    name: 'Nur Wahyu Nandarudin',
    location: 'Indonesia',
    email: 'nurwahyunandarudin21@gmail.com',
    bio: 'Mahasiswa Informatika Universitas Muhammadiyah Semarang yang passionate dalam pengembangan web modern.'
  });

  // Load settings dari localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
    }
  }, []);

  return (
    <section id="about" className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
            <FaUserGraduate className="text-white text-xl" />
          </div>
          <h2 className="text-4xl font-black">About Me</h2>
        </div>

        <p className="text-zinc-300 leading-relaxed text-lg">
          Saya <span className="text-purple-400 font-semibold">{settings.name}</span>, mahasiswa 
          <span className="text-cyan-400 font-semibold"> Informatika Universitas Muhammadiyah Semarang</span>. 
          Saya sangat passionate dalam dunia <span className="text-purple-400">pengembangan web modern</span> dan 
          <span className="text-cyan-400"> desain digital</span>.
        </p>

        <p className="text-zinc-400 leading-relaxed text-lg mt-4">
          {settings.bio}
        </p>

        <p className="text-zinc-400 leading-relaxed text-lg mt-4">
          Visi jangka panjang saya adalah <span className="text-purple-400 font-semibold">membangun startup teknologi</span> 
          sendiri yang berfokus pada solusi digital untuk pasar lokal dan global. Saya percaya bahwa 
          <span className="text-cyan-400"> ketekunan dan semangat belajar</span> adalah kunci untuk mencapai impian tersebut.
        </p>

        {/* INFO CARD */}
        <div className="grid md:grid-cols-4 gap-4 mt-10">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <FaUserGraduate className="text-purple-400 text-lg" />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Status</div>
              <div className="text-sm font-semibold text-purple-400">Mahasiswa Aktif</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <FaLaptopCode className="text-cyan-400 text-lg" />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Focus</div>
              <div className="text-sm font-semibold text-cyan-400">Web Development</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center">
              <FaBriefcase className="text-pink-400 text-lg" />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Platform</div>
              <div className="text-sm font-semibold text-pink-400">Fiverr • Upwork</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <FaHeart className="text-green-400 text-lg" />
            </div>
            <div>
              <div className="text-xs text-zinc-500">Motivation</div>
              <div className="text-sm font-semibold text-green-400">Never Stop Learning</div>
            </div>
          </div>
        </div>

        {/* CONTACT INFO - PAKAI DATA DARI SETTINGS */}
        <div className="grid md:grid-cols-3 gap-5 mt-8 pt-8 border-t border-white/10 text-zinc-300">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
            <span className="text-2xl">👤</span>
            <div>
              <div className="text-xs text-zinc-500">Full Name</div>
              <span className="text-sm">{settings.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
            <span className="text-2xl">📍</span>
            <div>
              <div className="text-xs text-zinc-500">Location</div>
              <span className="text-sm">{settings.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
            <span className="text-2xl">📧</span>
            <div>
              <div className="text-xs text-zinc-500">Email</div>
              <span className="text-sm">{settings.email}</span>
            </div>
          </div>
        </div>

        {/* QUOTE MOTIVASI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 text-center"
        >
          <p className="text-zinc-300 italic text-lg">
            "Kesuksesan tidak datang dari apa yang kamu lakukan sesekali, 
            tapi dari apa yang kamu lakukan secara konsisten."
          </p>
          <p className="text-purple-400 text-sm mt-3">- Semangat untuk terus belajar dan berkembang! 🚀</p>
        </motion.div>
      </motion.div>
    </section>
  );
}