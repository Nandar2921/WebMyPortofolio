import { motion } from "framer-motion";
import { FaRocket, FaCode, FaGraduationCap, FaHeart, FaBriefcase, FaChartLine } from "react-icons/fa";

const stats = [
  { 
    icon: <FaRocket />, 
    value: "3+", 
    label: "Projects Built", 
    description: "Proyek portfolio yang selesai",
    color: "text-purple-400",
    bg: "from-purple-500/20 to-pink-500/20"
  },
  { 
    icon: <FaCode />, 
    value: "500+", 
    label: "Hours of Code", 
    description: "Total waktu belajar & coding",
    color: "text-cyan-400",
    bg: "from-cyan-500/20 to-blue-500/20"
  },
  { 
    icon: <FaGraduationCap />, 
    value: "4th", 
    label: "Semester", 
    description: "Mahasiswa Informatika aktif",
    color: "text-green-400",
    bg: "from-green-500/20 to-emerald-500/20"
  },
  { 
    icon: <FaHeart />, 
    value: "100%", 
    label: "Commitment", 
    description: "Semangat belajar & berkembang",
    color: "text-pink-400",
    bg: "from-pink-500/20 to-rose-500/20"
  },
];

export default function Stats() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-black mb-4">My Journey So Far</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Setiap perjalanan dimulai dari langkah kecil. Ini adalah pencapaian yang telah saya raih sejauh ini.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            whileHover={{ y: -10, scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className={`glass-card text-center bg-gradient-to-br ${item.bg}`}
          >
            <div className={`text-5xl ${item.color} flex justify-center mb-4`}>
              {item.icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {item.value}
            </h2>
            <p className="text-purple-400 font-semibold mt-2">{item.label}</p>
            <p className="text-zinc-500 text-xs mt-1">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 text-center"
      >
        <p className="text-zinc-500 text-sm italic">
          "Bukan tentang seberapa hebat sekarang, tapi tentang seberapa konsisten kita belajar dan berkembang."
        </p>
        <p className="text-purple-400 text-xs mt-2">- Masih dalam perjalanan menjadi lebih baik setiap hari ✨</p>
      </motion.div>
    </section>
  );
}