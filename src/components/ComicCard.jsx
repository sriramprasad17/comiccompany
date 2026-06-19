import React from 'react';

export default function ComicCard({ 
  comic, 
  libraryEntry, 
  liked,
  likesCount,
  onRead, 
  onDetails, 
  onToggleBookmark,
  onToggleLike
}) {
  const isBookmarked = libraryEntry ? libraryEntry.bookmarked : false;
  const progress = libraryEntry ? libraryEntry.progress : 0;
  const progressPct = comic.pages > 0 ? Math.round((progress / comic.pages) * 100) : 0;

  return (
    <article className="comic-card">
      <div className="comic-cover-wrapper">
        <span className="comic-badge badge-free" style={{ background: 'var(--color-secondary)' }}>
          {comic.category}
        </span>
        <img className="comic-cover" src={comic.cover} alt={`Cover of ${comic.title}`} loading="lazy" width="240" height="240" />
        
        <div className="comic-actions-overlay">
          <button type="button" className="card-btn card-btn-primary" onClick={onRead}>
            📖 Read Now
          </button>
          <button type="button" className="card-btn card-btn-secondary" onClick={onDetails}>
            🔍 Summary Details
          </button>
          <button type="button" className="card-btn card-btn-secondary" onClick={onToggleBookmark}>
            ⭐ {isBookmarked ? 'Remove Library' : 'Add to Library'}
          </button>
        </div>
      </div>
      <div className="comic-info">
        <span className="comic-category">{comic.category} Edition</span>
        <h3 className="comic-title">{comic.title}</h3>
        <span className="comic-author">By {comic.author}</span>
        
        {progress > 0 && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifycontent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              <span>Reading Progress</span>
              <span>{progressPct}%</span>
            </div>
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '2px' }}></div>
            </div>
          </div>
        )}
        
        <div className="comic-footer">
          <div className="comic-rating">
            ⭐ {comic.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '0.75rem', marginInlineStart: '2px' }}>({comic.reviews})</span>
          </div>
          
          <button 
            type="button" 
            className={`like-heart-btn ${liked ? 'liked' : ''}`}
            onClick={onToggleLike}
            title={liked ? "Unlike this book" : "Like this book"}
          >
            ❤️ <span className="like-count">{likesCount}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
