import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const menuItems = ["Home", "About", "Skills", "Projects", "Contact"];

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    applyTheme(newMode);
  };

  const applyTheme = (isDark) => {
    if (isDark) {
      document.documentElement.style.backgroundColor = "#050816";
      document.body.style.backgroundColor = "#050816";
      document.body.style.color = "white";
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.documentElement.style.backgroundColor = "#f5f5f5";
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "black";
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      const isDark = savedMode === "true";
      setDarkMode(isDark);
      applyTheme(isDark);
    } else {
      applyTheme(true);
    }
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV.pdf";
    link.download = "Nur_Wahyu_Nandarudin_CV.pdf";
    link.target = "_blank";
    link.click();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-2xl border-b transition-all duration-300 ${
        darkMode
          ? "bg-black/30 border-white/10"
          : "bg-white/80 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-4xl font-black cursor-pointer ${
            darkMode ? "text-white" : "text-black"
          }`}
          onClick={() => scrollToSection("home")}
        >
          NW<span className="text-purple-500">.</span>
        </motion.h1>

        <ul className="hidden md:flex gap-10">
          {menuItems.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`cursor-pointer transition-colors ${
                darkMode
                  ? "text-zinc-300 hover:text-purple-400"
                  : "text-gray-600 hover:text-purple-600"
              }`}
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              <a href={`#${item.toLowerCase()}`}>{item}</a>
            </motion.li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 w-10 h-10 flex items-center justify-center hover:scale-110"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-purple-600" />
            )}
          </button>

          <button
            onClick={downloadCV}
            className={`border px-6 py-2 rounded-xl transition hover:scale-105 ${
              darkMode
                ? "border-white/10 hover:bg-white/10 text-white"
                : "border-gray-300 hover:bg-gray-100 text-black"
            }`}
          >
            Download CV
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 w-8 h-8 flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-purple-600" />
            )}
          </button>

          <button
            className={`text-2xl ${darkMode ? "text-white" : "text-black"}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden backdrop-blur-xl border-b py-5 ${
            darkMode
              ? "bg-black/95 border-white/10"
              : "bg-white/95 border-gray-200"
          }`}
        >
          <ul className="flex flex-col items-center gap-5">
            {menuItems.map((item, i) => (
              <li
                key={i}
                className={`cursor-pointer transition-colors text-lg ${
                  darkMode
                    ? "text-zinc-300 hover:text-purple-400"
                    : "text-gray-600 hover:text-purple-600"
                }`}
                onClick={() => scrollToSection(item.toLowerCase())}
              >
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
            <li>
              <button
                onClick={downloadCV}
                className={`border px-6 py-2 rounded-xl transition ${
                  darkMode
                    ? "border-white/10 hover:bg-white/10 text-white"
                    : "border-gray-300 hover:bg-gray-100 text-black"
                }`}
              >
                Download CV
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}