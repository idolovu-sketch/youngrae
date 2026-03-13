import { useState } from 'react';
import Reveal from './Reveal';

export default function Message() {
  return (
    <section id="message">
      <Reveal>
        <div className="section-label">04 // MESSAGE</div>
        <h2 className="section-title">엄마한테 한마디</h2>
      </Reveal>

      <Reveal className="message-box">
        <div className="msg-header">
          <div className="msg-avatar">👦</div>
          <div>
            <div className="msg-sender">조영래</div>
            <div className="msg-time">TODAY AT 새벽 2:47 AM</div>
          </div>
        </div>

        <div className="msg-content">
          <p>엄마, 나 <span className="highlight">프로게이머</span> 될 거니까 게임은 투자야, 투자! 💰</p>
          <p>공부는 AI가 다 해주는 시대가 온다며... <span className="small-text">(이건 어디서 들은 건데)</span></p>
          <p>그리고 <span className="highlight">밥 차려주셔서 감사합니다</span>. 특히 라면 끓여줄 때 계란 두 개 넣어주는 거 최고 👍</p>
          <p>아 그리고... 이번 시험은 좀... 그... <span className="small-text">(점수는 묻지 마세요 🙏)</span></p>
          <p>근데 진짜 <span className="highlight">사랑해요 엄마</span> ❤️ <span className="small-text">(용돈 올려주면 더 사랑함)</span></p>
        </div>

        <div className="msg-footer">
          <div className="msg-reactions">
            <Reaction emoji="❤️" initialCount={1} />
            <Reaction emoji="😂" initialCount={3} />
            <Reaction emoji="😤" initialCount={1} />
            <Reaction emoji="🍜" initialCount={2} />
          </div>
          <span className="msg-status">✓✓ 읽음</span>
        </div>
      </Reveal>
    </section>
  );
}

function Reaction({ emoji, initialCount }) {
  const [count, setCount] = useState(initialCount);
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setCount(c => c + 1);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
  };

  return (
    <span 
      className="reaction" 
      onClick={handleClick}
      style={{ transform: animate ? 'scale(1.3)' : 'scale(1)' }}
    >
      {emoji} <span className="count">{count}</span>
    </span>
  );
}
