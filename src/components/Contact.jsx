import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaGithub, FaTiktok } from "react-icons/fa";

const contactItems = [
  { icon: HiOutlineMail, label: "Email", value: "nurwahyunandarudin21@gmail.com", color: "text-purple-400", link: "mailto:nurwahyunandarudin21@gmail.com" },
  { icon: FaInstagram, label: "Instagram", value: "@n_wahyu_n", color: "text-pink-400", link: "https://instagram.com/n_wahyu_n" },
  { icon: FaTiktok, label: "TikTok", value: "@santuy.217", color: "text-white", link: "https://tiktok.com/@santuy.217" },
  { icon: HiOutlineLocationMarker, label: "Location", value: "Indonesia", color: "text-cyan-400", link: "https://maps.google.com/?q=Indonesia" },
  { icon: FaWhatsapp, label: "WhatsApp", value: "+62 889-8004-5976", color: "text-green-400", link: "https://wa.me/6288980045976" },
  { icon: FaGithub, label: "GitHub", value: "Nandar2921", color: "text-white", link: "https://github.com/Nandar2921" },
];

export default function Contact() {
  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-12"
      >
        <h2 className="text-5xl font-black mb-6">Let's Work Together</h2>
        <p className="text-zinc-400 text-lg">
          Punya project menarik? Atau cuma mau ngobrol santai?
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-14">
          {contactItems.map((item, i) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              whileHover={{ y: -5 }}
              className="contact-card cursor-pointer block text-center"
            >
              <item.icon className={`contact-icon ${item.color} mx-auto`} />
              <p className="mt-4 font-semibold text-sm">{item.label}</p>
              <p className="text-zinc-400 text-xs mt-2 break-words">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}