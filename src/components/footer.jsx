import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-10 text-center text-zinc-500">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>© {year} Nur Wahyu Portfolio | Built with React + Tailwind + Framer Motion</p>
        <p className="text-sm mt-2 text-zinc-600">✨ Let's create something amazing together ✨</p>
      </motion.div>
    </footer>
  );
}