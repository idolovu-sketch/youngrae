import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

export default function Stats() {
  return (
    <section id="stats">
      <Reveal>
        <div className="section-label">02 // DAILY STATS</div>
        <h2 className="section-title">하루 스탯</h2>
      </Reveal>

      <Reveal className="stats-grid">
        <StatCard icon="🎮" title="GAME TIME" value="12h" color="cyan" desc="하루 평균 게임 시간" />
        <StatCard icon="📚" title="STUDY TIME" value="0.5h" color="pink" desc="시험 전날에만 가끔..." />
        <StatCard icon="😴" title="SLEEP" value="5h" color="purple" desc="새벽 3시 취침이 국룰" />
        <StatCard icon="🍜" title="RAMEN" value="3개" color="yellow" desc="하루 라면 섭취량" />
        <StatCard icon="📱" title="SCREEN TIME" value="16h" color="green" desc="핸드폰 + 컴퓨터 합산" />
        <StatCard icon="👩" title="엄마 잔소리" value="∞" color="orange" desc="측정 불가" />
      </Reveal>

      <ChartContainer />
    </section>
  );
}

function StatCard({ icon, title, value, color, desc }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${color}`}>{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
}

function ChartContainer() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.3 });

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div ref={ref} className="chart-container reveal visible">
      <div className="chart-title">⚔️ 24시간 시간 배분 ⚔️</div>
      <div className="chart-bars">
        <BarRow label="🎮 게임" type="game" percent="50" isVisible={isVisible} />
        <BarRow label="😴 수면" type="sleep" percent="21" isVisible={isVisible} />
        <BarRow label="🍜 식사" type="eat" percent="12" isVisible={isVisible} />
        <BarRow label="📱 유튜브" type="game" percent="15" isVisible={isVisible} />
        <BarRow label="📚 공부" type="study" percent="2" isVisible={isVisible} />
      </div>
    </div>
  );
}

function BarRow({ label, type, percent, isVisible }) {
  return (
    <div className="bar-row">
      <span className="bar-label">{label}</span>
      <div className="bar-track">
        <div 
          className={`bar-fill ${type}`} 
          style={{ width: isVisible ? `${percent}%` : '0%' }}
        />
      </div>
      <span className="bar-percent">{percent}%</span>
    </div>
  );
}
