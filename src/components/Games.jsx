import Reveal from './Reveal';

const gamesData = [
  { emoji: '⚔️', name: '리그 오브 레전드', genre: 'MOBA', hours: '3,847', rank: '💎 DIAMOND', rankClass: 'rank-diamond' },
  { emoji: '🔫', name: '발로란트', genre: 'FPS', hours: '2,156', rank: '💜 PLATINUM', rankClass: 'rank-plat' },
  { emoji: '🏝️', name: '마인크래프트', genre: 'SANDBOX', hours: '1,523', rank: '👑 서버장', rankClass: 'rank-master' },
  { emoji: '⚽', name: 'FC 온라인', genre: 'SPORTS', hours: '987', rank: '🏅 GOLD', rankClass: 'rank-gold' }
];

export default function Games() {
  return (
    <section id="games">
      <Reveal>
        <div className="section-label">03 // FAVORITE GAMES</div>
        <h2 className="section-title">즐겨하는 게임</h2>
      </Reveal>

      <Reveal className="games-grid">
        {gamesData.map((game, i) => (
          <GameCard key={i} {...game} />
        ))}
      </Reveal>
    </section>
  );
}

function GameCard({ emoji, name, genre, hours, rank, rankClass }) {
  return (
    <div className="game-card">
      <span className="game-emoji">{emoji}</span>
      <div className="game-name">{name}</div>
      <div className="game-genre">{genre}</div>
      <div className="game-hours">{hours} HOURS</div>
      <div className={`game-rank ${rankClass}`}>{rank}</div>
    </div>
  );
}
