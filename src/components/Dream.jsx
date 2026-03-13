import Reveal from './Reveal';

export default function Dream() {
  return (
    <section id="dream">
      <Reveal>
        <div className="section-label">05 // FUTURE</div>
        <h2 className="section-title">장래희망</h2>
      </Reveal>

      <Reveal className="dream-container">
        <div className="dream-main">
          <span className="dream-emoji">🏆</span>
          <div className="dream-title">세계 최고의 프로게이머</div>
          <div className="dream-desc">
            T1 페이커 형 옆자리에 앉는 그 날까지...<br />
            (일단 다이아 찍었으니까 반은 온 거 아닌가요?)
          </div>

          <div className="dream-roadmap">
            <span className="roadmap-step done">✓ 게임 시작</span>
            <span className="roadmap-arrow">→</span>
            <span className="roadmap-step done">✓ 다이아 달성</span>
            <span className="roadmap-arrow">→</span>
            <span className="roadmap-step current">► 챌린저 도전 중</span>
            <span className="roadmap-arrow">→</span>
            <span className="roadmap-step future">○ 프로팀 입단</span>
            <span className="roadmap-arrow">→</span>
            <span className="roadmap-step future">○ 월드 챔피언</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
