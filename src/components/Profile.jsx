import Reveal from './Reveal';

export default function Profile() {
  return (
    <section id="profile">
      <Reveal>
        <div className="section-label">01 // PROFILE</div>
        <h2 className="section-title">프로필</h2>
      </Reveal>

      <Reveal className="profile-grid">
        <div className="profile-avatar">
          <div className="avatar-frame">
            <img src={`${import.meta.env.BASE_URL}youngrae.jpg`} alt="조영래" className="avatar-photo" />
          </div>
          <div className="avatar-status">● ONLINE - 게임 중</div>
        </div>

        <div className="profile-info">
          <InfoCard label="REAL NAME" value="조영래" small="(별명: 영래봇)" />
          <InfoCard label="AGE & SCHOOL" value="16세 · 백현중학교 3학년" />
          <InfoCard label="MAIN CLASS" value="풀타임 게이머" small="(파트타임 학생)" />
          <InfoCard label="SPECIAL ABILITY" value="엄마 잔소리 면역 MAX 🛡️" />
          <InfoCard label="WEAKNESS" value="수학 교과서 📕" small="(치명적 데미지)" />

          <div className="profile-tags">
            <span className="tag cyan"># 게이머</span>
            <span className="tag pink"># 공부안함</span>
            <span className="tag purple"># 야행성</span>
            <span className="tag yellow"># 라면러버</span>
            <span className="tag green"># 반항기</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function InfoCard({ label, value, small }) {
  return (
    <div className="info-card">
      <div className="info-label">{label}</div>
      <div className="info-value">
        {value} {small && <span className="small">{small}</span>}
      </div>
    </div>
  );
}
