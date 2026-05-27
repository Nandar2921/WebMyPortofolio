import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { FaInstagram, FaWhatsapp, FaGithub, FaTiktok } from "react-icons/fa";

export default function Contact() {
  const [settings, setSettings] = useState({
    email: 'nurwahyunandarudin21@gmail.com',
    location: 'Indonesia',
    phone: '+62 889-8004-5976',
    instagram: 'https://instagram.com/n_wahyu_n',
    tiktok: 'https://tiktok.com/@santuy.217',
    whatsapp: 'https://wa.me/6288980045976',
    github: 'https://github.com/Nandar2921'
  });

  // Load settings dari localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
    }
  }, []);

  const contactItems = [
    { 
      icon: HiOutlineMail, 
      label: "Email", 
      value: settings.email, 
      color: "text-purple-400", 
      link: `mailto:${settings.email}` 
    },
    { 
      icon: FaInstagram, 
      label: "Instagram", 
      value: "@n_wahyu_n", 
      color: "text-pink-400", 
      link: settings.instagram 
    },
    { 
      icon: FaTiktok, 
      label: "TikTok", 
      value: "@santuy.217", 
      color: "text-white", 
      link: settings.tiktok 
    },
    { 
      icon: HiOutlineLocationMarker, 
      label: "Location", 
      value: settings.location, 
      color: "text-cyan-400", 
      link: "https://maps.google.com/?q=Indonesia" 
    },
    { 
      icon: HiOutlinePhone, 
      label: "WhatsApp", 
      value: settings.phone, 
      color: "text-green-400", 
      link: settings.whatsapp 
    },
    { 
      icon: FaGithub, 
      label: "GitHub", 
      value: "Nandar2921", 
      color: "text-white", 
      link: settings.github 
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-8 md:p-12"
      >
        <h2 className="text-4xl md:text-5xl font-black mb-4">Let's Work Together</h2>
        <p className="text-zinc-400 text-base md:text-lg">
          Punya project menarik? Atau cuma mau ngobrol santai? Hubungi saya lewat platform di bawah ini!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-10 md:mt-14">
          {contactItems.map((item, i) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              whileHover={{ y: -5, scale: 1.05 }}
              className="contact-card cursor-pointer block text-center p-4 md:p-5"
            >
              <item.icon className={`contact-icon ${item.color} mx-auto text-3xl md:text-4xl`} />
              <p className="mt-3 font-semibold text-sm md:text-base">{item.label}</p>
              <p className="text-zinc-400 text-xs mt-1 break-words hidden md:block">{item.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Tambahan jam kerja / respons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-zinc-500 text-sm">
            💬 Fast response within 24 hours | 📍 {settings.location}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}