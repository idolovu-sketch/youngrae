import { useState, useEffect, useCallback } from 'react';
import exifr from 'exifr';
import Reveal from './Reveal';

const travelData = [
  { 
    emoji: '🇯🇵', 
    country: '일본', 
    city: '도쿄', 
    highlight: '도쿄 시내에서 헤메다 옴 🗾',
    status: 'done',
    year: '2023',
    folder: 'japan'
  },
  { 
    emoji: '🇮🇹', 
    country: '이탈리아', 
    city: '로마 · 밀라노 · 베네치아', 
    highlight: '진짜 피자는 차원이 다름 🍕',
    status: 'done',
    year: '2024',
    folder: 'italy'
  },
  { 
    emoji: '🇫🇷', 
    country: '프랑스', 
    city: '파리 · 니스', 
    highlight: '에펠탑 앞에서 셀카 찍음 🗼',
    status: 'done',
    year: '2024',
    folder: 'france'
  },
  { 
    emoji: '🇺🇸', 
    country: '미국', 
    city: '로스앤젤레스 · 뉴욕', 
    highlight: 'LCS 결승전 직관 가고 싶다 🏟️',
    status: 'wish',
    year: '목표',
    folder: 'usa'
  }
];

// Photo lists per country folder
const photosByFolder = {
  japan: [],
  italy: [
    '01a03b46b918c397669d4bb526579c2ba3bea8ac45.jpg',
    '01a0597c348bc4f0ddd1786b299f34168eda26f244.jpg',
    '01a095535656f96ffb7fab62d79a4576d2048c0520.jpg',
    '01a1d3ea8321fff2b99904916b6eefb4f28ae3b5b3.jpg',
    '01a213c244579f22e789529ac884aecca68047286b.jpg',
    '01a443a4add39f154ca048ea9aff262708b3f210aa.jpg',
    '01a45a33378fd8c750d59b2fcf1a4ab839264c4fc9.jpg',
    '01a9a6dd525daad24a5ee30bff50e46a48a019e47a.jpg',
    '01aa246bc1c5960d7161d98a7484bcd45367dd7d4f.jpg',
    '01aa3bdedbe4329388a7c8100a8c3e001cba8b1f2f.jpg',
    '01abbba6db5dfeb1b43da3e2ceda5feff681998293.jpg',
    '01ac3a3dd472eeb1c926f76c72628be2985ad67191.jpg',
    '01acb2024f2f4442a124c1d4b9e6039bc471c2f9cf.jpg',
    '01ace8287347f87ee0b4f479b5de0d4471b61ec466.jpg',
    '01ae7214ab3edf355a80d39bcd1bd0b0d6cb29745d.jpg',
    '01afd2735bee3cb7bede4e68364d3a8f3dd0398eab.jpg',
    '01e9c55ae18496ee15c76070267dad51584f078a05.jpg',
  ],
  france: [],
  usa: [],
};

function formatExifDate(date) {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d.getTime())) return null;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day}  ${hours}:${minutes}`;
}

export default function Travel() {
  const [galleryOpen, setGalleryOpen] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [photoDate, setPhotoDate] = useState(null);
  const [dateLoading, setDateLoading] = useState(false);

  // Read EXIF date when photo changes
  useEffect(() => {
    if (!galleryOpen) return;
    const photos = photosByFolder[galleryOpen];
    if (!photos || photos.length === 0) return;

    const photoUrl = `/travel/${galleryOpen}/${photos[currentPhoto]}`;
    setDateLoading(true);
    setPhotoDate(null);

    exifr.parse(photoUrl, { pick: ['DateTimeOriginal', 'CreateDate', 'ModifyDate'] })
      .then((exif) => {
        const date = exif?.DateTimeOriginal || exif?.CreateDate || exif?.ModifyDate;
        setPhotoDate(formatExifDate(date));
        setDateLoading(false);
      })
      .catch(() => {
        setPhotoDate(null);
        setDateLoading(false);
      });
  }, [galleryOpen, currentPhoto]);

  const openGallery = (folder) => {
    const photos = photosByFolder[folder];
    if (photos && photos.length > 0) {
      setGalleryOpen(folder);
      setCurrentPhoto(0);
    }
  };

  const closeGallery = useCallback(() => {
    setGalleryOpen(null);
    setCurrentPhoto(0);
    setPhotoDate(null);
  }, []);

  const nextPhoto = useCallback((e) => {
    e.stopPropagation();
    const photos = photosByFolder[galleryOpen];
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  }, [galleryOpen]);

  const prevPhoto = useCallback((e) => {
    e.stopPropagation();
    const photos = photosByFolder[galleryOpen];
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  }, [galleryOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!galleryOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextPhoto(e);
      if (e.key === 'ArrowLeft') prevPhoto(e);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [galleryOpen, closeGallery, nextPhoto, prevPhoto]);

  const photos = galleryOpen ? photosByFolder[galleryOpen] : [];
  const countryName = galleryOpen 
    ? travelData.find(t => t.folder === galleryOpen)?.country 
    : '';

  return (
    <section id="travel">
      <Reveal>
        <div className="section-label">06 // WORLD TRAVEL</div>
        <h2 className="section-title">영래의 세계여행</h2>
      </Reveal>

      <Reveal className="travel-grid">
        {travelData.map((place, i) => (
          <TravelCard 
            key={i} 
            {...place} 
            hasPhotos={photosByFolder[place.folder]?.length > 0}
            onClick={() => openGallery(place.folder)}
          />
        ))}
      </Reveal>

      <Reveal>
        <div className="travel-stats-bar">
          <div className="travel-stat-item">
            <span className="travel-stat-number cyan">3</span>
            <span className="travel-stat-label">COUNTRIES VISITED</span>
          </div>
          <div className="travel-stat-divider"></div>
          <div className="travel-stat-item">
            <span className="travel-stat-number pink">1</span>
            <span className="travel-stat-label">BUCKET LIST</span>
          </div>
          <div className="travel-stat-divider"></div>
          <div className="travel-stat-item">
            <span className="travel-stat-number yellow">∞</span>
            <span className="travel-stat-label">RAMEN EATEN ABROAD</span>
          </div>
        </div>
      </Reveal>

      {/* Photo Gallery Modal */}
      {galleryOpen && photos.length > 0 && (
        <div className="gallery-overlay" onClick={closeGallery}>
          <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-header">
              <span className="gallery-title">📸 {countryName}</span>
              <span className="gallery-counter">{currentPhoto + 1} / {photos.length}</span>
              <button className="gallery-close" onClick={closeGallery}>✕</button>
            </div>
            <div className="gallery-image-container">
              <button className="gallery-nav gallery-prev" onClick={prevPhoto}>‹</button>
              <img 
                src={`/travel/${galleryOpen}/${photos[currentPhoto]}`} 
                alt={`${countryName} photo ${currentPhoto + 1}`}
                className="gallery-image"
              />
              <button className="gallery-nav gallery-next" onClick={nextPhoto}>›</button>
            </div>
            <div className="gallery-footer">
              {dateLoading && (
                <span className="gallery-date">📅 loading...</span>
              )}
              {!dateLoading && photoDate && (
                <span className="gallery-date">📅 {photoDate}</span>
              )}
              {!dateLoading && !photoDate && (
                <span className="gallery-date" style={{ opacity: 0.4 }}>📅 날짜 정보 없음</span>
              )}
              <div className="gallery-dots">
                {photos.map((_, i) => (
                  <button 
                    key={i}
                    className={`gallery-dot ${i === currentPhoto ? 'active' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setCurrentPhoto(i); }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function TravelCard({ emoji, country, city, highlight, status, year, hasPhotos, onClick }) {
  const statusConfig = {
    done: { label: '✓ VISITED', className: 'travel-done' },
    wish: { label: '★ BUCKET LIST', className: 'travel-wish' },
    home: { label: '♥ HOME', className: 'travel-home' }
  };

  const { label, className } = statusConfig[status];

  return (
    <div className={`travel-card ${className}`} onClick={onClick}>
      <div className="travel-flag">{emoji}</div>
      <div className="travel-info">
        <div className="travel-country">{country}</div>
        <div className="travel-city">{city}</div>
        <div className="travel-highlight">{highlight}</div>
      </div>
      <div className="travel-meta">
        <span className={`travel-badge ${className}`}>{label}</span>
        <span className="travel-year">{year}</span>
        {hasPhotos && <span className="travel-photo-hint">📷 사진 보기</span>}
      </div>
    </div>
  );
}
