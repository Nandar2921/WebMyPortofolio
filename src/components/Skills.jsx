import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaPaintBrush } from "react-icons/fa";

export default function Skills() {
  const [settings, setSettings] = useState({
    htmlSkill: 90,
    cssSkill: 85,
    jsSkill: 80,
    reactSkill: 82,
    uiuxSkill: 75,
    designSkill: 88
  });

  // Load settings dari localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
    }
  }, []);

  const skills = [
    { 
      name: "HTML", 
      level: `${settings.htmlSkill}%`, 
      description: "Struktur web semantik dan SEO-friendly",
      icon: <FaHtml5 className="text-orange-500 text-3xl" />,
      color: "from-orange-500 to-red-500",
      progress: settings.htmlSkill
    },
    { 
      name: "CSS / Tailwind", 
      level: `${settings.cssSkill}%`, 
      description: "Styling modern, responsive, dan utility-first CSS",
      icon: <FaCss3Alt className="text-blue-500 text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      progress: settings.cssSkill
    },
    { 
      name: "JavaScript", 
      level: `${settings.jsSkill}%`, 
      description: "ES6+, DOM manipulation, dan logic programming",
      icon: <FaJs className="text-yellow-500 text-3xl" />,
      color: "from-yellow-500 to-orange-500",
      progress: settings.jsSkill
    },
    { 
      name: "React.js", 
      level: `${settings.reactSkill}%`, 
      description: "Hooks, state management, dan component architecture",
      icon: <FaReact className="text-cyan-500 text-3xl" />,
      color: "from-cyan-500 to-blue-500",
      progress: settings.reactSkill
    },
    { 
      name: "UI / UX Design", 
      level: `${settings.uiuxSkill}%`, 
      description: "Wireframing, prototyping, dan user research dasar",
      icon: <FaFigma className="text-pink-500 text-3xl" />,
      color: "from-purple-500 to-pink-500",
      progress: settings.uiuxSkill
    },
    { 
      name: "Canva / Design", 
      level: `${settings.designSkill}%`, 
      description: "Desain grafis untuk konten media sosial & presentasi",
      icon: <FaPaintBrush className="text-teal-500 text-3xl" />,
      color: "from-green-500 to-teal-500",
      progress: settings.designSkill
    },
  ];

  // Skill categories yang sedang dipelajari (coming soon)
  const learningSkills = [
    { name: "Next.js", icon: "⚡", color: "text-gray-400" },
    { name: "TypeScript", icon: "📘", color: "text-blue-400" },
    { name: "Node.js", icon: "🟢", color: "text-green-400" },
    { name: "MongoDB", icon: "🍃", color: "text-green-500" },
  ];

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card"
      >
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
            <FaReact className="text-white text-xl" />
          </div>
          <h2 className="text-4xl font-black">My Skills</h2>
        </div>

        <p className="text-zinc-400 mb-8 text-center md:text-left">
          Berikut adalah teknologi dan tools yang saya kuasai saat ini. 
          Saya terus belajar dan meningkatkan kemampuan setiap harinya! 📚
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{skill.name}</span>
                    <span className="text-purple-400 font-semibold">{skill.level}</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{skill.description}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.progress + "%" }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📖</span>
            <h3 className="text-xl font-semibold text-purple-400">Currently Learning</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300 ml-2">In Progress</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {learningSkills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300"
              >
                <span className="text-base">{skill.icon}</span>
                <span className={`text-sm font-medium ${skill.color}`}>{skill.name}</span>
              </motion.div>
            ))}
          </div>
          
          <p className="text-xs text-zinc-500 mt-3">
            *Saya percaya bahwa belajar adalah proses seumur hidup. Setiap hari adalah kesempatan untuk berkembang! 🚀
          </p>
        </motion.div>

        {/* Skill Stats Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-around gap-4 pt-5 border-t border-white/10"
        >
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {skills.length}+
            </div>
            <div className="text-xs text-zinc-500">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {learningSkills.length}+
            </div>
            <div className="text-xs text-zinc-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              📚
            </div>
            <div className="text-xs text-zinc-500">Always Learning</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}