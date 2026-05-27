import { motion } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

// FUNGSI untuk bikin screenshot otomatis dari link
const getScreenshotUrl = (url) => {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
};

const projects = [
  {
    id: 1,
    title: "Laundry App",
    desc: "Sistem laundry modern dengan dashboard admin dan pelanggan. Fitur: order online, tracking status, payment gateway, dan manajemen karyawan.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind", "Express"],
    // 🔥 OTOMATIS ambil screenshot dari link web!
    image: getScreenshotUrl("https://web-app-sistem-londry--nurwahyu21.replit.app"),
    github: "https://github.com/Nandar2921/WebApp-Sistem-londry",
    demo: "https://web-app-sistem-londry--nurwahyu21.replit.app",
    features: [
      "Dashboard Admin & Customer",
      "Tracking Order Real-time",
      "Payment Gateway Integration",
      "Laporan Keuangan"
    ]
  },
  {
    id: 2,
    title: "Toko Buah",
    desc: "Website penjualan buah-buahan segar secara online. Fitur: katalog produk, keranjang belanja, checkout, dan manajemen stok.",
    tech: ["React", "Tailwind", "Vercel"],
    // 🔥 OTOMATIS ambil screenshot dari link web!
    image: getScreenshotUrl("https://web-toko-buah-6uaq.vercel.app/"),
    github: "https://github.com/Nandar2921/WebTokoBuah",
    demo: "https://web-toko-buah-6uaq.vercel.app/",
    features: [
      "Katalog Produk Buah",
      "Keranjang Belanja",
      "Checkout System",
      "Manajemen Stok"
    ]
  },
  {
    id: 3,
    title: "Creator Portfolio",
    desc: "Portfolio pribadi dengan animasi modern dan UI elegan. Responsive design, dark mode, dan performa tinggi.",
    tech: ["React", "Framer Motion", "Tailwind", "Vite"],
    // 🔥 OTOMATIS ambil screenshot dari link web!
    image: getScreenshotUrl("https://myportofolio-kappa-sage.vercel.app/"),
    github: "https://github.com/Nandar2921/WebMyPortofolio",
    demo: "https://myportofolio-kappa-sage.vercel.app/",
    features: [
      "Smooth Animations",
      "Dark/Light Mode",
      "Responsive Design",
      "Music Player"
    ]
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const openLink = (url, e) => {
    if (e) e.stopPropagation();
    if (url && url !== "#") {
      window.open(url, "_blank");
    } else {
      alert("Website coming soon! 🚀");
    }
  };

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-black mb-4">My Projects</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Berikut adalah beberapa project yang telah saya kerjakan. 
          Klik card untuk melihat detail, atau klik tombol untuk langsung buka website.
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => openModal(project)}
            className="glass-card overflow-hidden cursor-pointer group"
          >
            {/* Gambar Preview - LANGSUNG dari LINK WEB! */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/30 to-cyan-900/30">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Badge "Live" di pojok */}
              <div className="absolute top-2 left-2">
                <span className="text-xs px-2 py-1 bg-green-500/80 backdrop-blur rounded-full text-white">
                  🌐 Live
                </span>
              </div>
              
              {/* Icon Link Cepat */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(project.github, e);
                  }}
                  className="p-2 bg-black/50 backdrop-blur rounded-full hover:bg-purple-500 transition"
                  title="View GitHub"
                >
                  <FaGithub className="text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openLink(project.demo, e);
                  }}
                  className="p-2 bg-black/50 backdrop-blur rounded-full hover:bg-green-500 transition"
                  title="Open Website"
                >
                  <FaExternalLinkAlt className="text-white" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-zinc-400">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Tombol BUKA WEBSITE LANGSUNG */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openLink(project.demo, e);
                }}
                className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <FaExternalLinkAlt /> Visit Website →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL DETAIL PROJECT */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          >
            {/* Gambar Preview Full - LANGSUNG dari LINK WEB! */}
            <div className="relative h-64 md:h-80">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover rounded-t-2xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-red-500 transition"
              >
                <FaTimes className="text-white text-lg" />
              </button>
              
              <div className="absolute bottom-4 left-4">
                <span className="text-sm px-3 py-1 bg-green-500/80 backdrop-blur rounded-full text-white">
                  🌐 Live Website
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech, idx) => (
                  <span key={idx} className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                    {tech}
                  </span>
                ))}
              </div>

              <p className="text-zinc-300 leading-relaxed mb-6">
                {selectedProject.desc}
              </p>

              {selectedProject.features && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-purple-400"> Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-zinc-400">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => openLink(selectedProject.github, null)}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
                >
                  <FaGithub /> View GitHub
                </button>
                <button
                  onClick={() => openLink(selectedProject.demo, null)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl hover:scale-105 transition shadow-lg"
                >
                  <FaExternalLinkAlt /> Visit Live Website 🌐
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}