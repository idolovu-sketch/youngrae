import { useEffect, useState } from 'react';

export default function Particles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const colors = ['var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-purple)'];
      const c = colors[Math.floor(Math.random() * colors.length)];
      return {
        id: i,
        left: Math.random() * 100 + '%',
        animationDuration: (6 + Math.random() * 10) + 's',
        animationDelay: (Math.random() * 8) + 's',
        size: (2 + Math.random() * 3) + 'px',
        background: c,
        boxShadow: `0 0 6px ${c}`,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="noise"></div>
      <div className="particles" id="particles">
        {particles.map(p => (
          <div 
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              width: p.size,
              height: p.size,
              background: p.background,
              boxShadow: p.boxShadow
            }}
          />
        ))}
      </div>
    </>
  );
}
