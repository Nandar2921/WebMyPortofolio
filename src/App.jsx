import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* AUDIO ELEMENT - DILUAR KONDISI, JADI SELALU ADA */}
      <audio ref={audioRef} src="/Lagu.mp3" loop />
      
      {showSplash ? (
        <SplashScreen 
          onComplete={handleSplashComplete} 
          audioRef={audioRef}
        />
      ) : (
        <div className="bg-[#050816] text-white overflow-hidden min-h-screen">
          <div className="fixed inset-0 -z-10">
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[200px] rounded-full" />
          </div>

          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Stats />
          <Projects />
          <Contact />
          <Footer />
          <MusicPlayer audioRef={audioRef} />

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition hover:scale-110"
              aria-label="Scroll to top"
            >
              ↑
            </button>
          )}
        </div>
      )}
    </>
  );
}