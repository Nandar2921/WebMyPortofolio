import { useState, useEffect } from "react";

const texts = [
  "Welcome to my portfolio! ✨",
  "Web Developer 💻",
  "Content Creator 🎬",
  "Let's create something amazing! 🚀",
];

export default function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 100);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="h-16">
      <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {texts[index].substring(0, subIndex)}
      </span>
      <span className="animate-pulse">|</span>
    </div>
  );
}