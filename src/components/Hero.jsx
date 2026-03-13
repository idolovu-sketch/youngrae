import { useEffect, useState } from 'react';

export default function Hero() {
  const [tagText, setTagText] = useState('');
  const fullText = '/// PLAYER ONE CONNECTED ///';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTagText(prev => fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="hero">
      <div className="hero-bg-glow cyan"></div>
      <div className="hero-bg-glow pink"></div>
      <div className="hero-bg-glow purple"></div>

      <div className="hero-tag">{tagText}</div>
      <h1 className="hero-name">조<span className="accent">영래</span></h1>
      <p className="hero-sub">백현중학교 3학년 · 프로게이머 지망생 (자칭)</p>

      <div className="hero-level">
        <span className="level-badge">LV. 16</span>
        <div className="xp-bar"><div className="xp-fill"></div></div>
        <span className="xp-text">7,300 / 10,000 XP</span>
      </div>

      <div className="scroll-indicator">
        <span></span>
        <small>SCROLL DOWN</small>
      </div>
    </header>
  );
}
