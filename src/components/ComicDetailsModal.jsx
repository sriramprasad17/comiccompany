import React from 'react';

export default function ComicDetailsModal({ 
  comic, 
  libraryEntry, 
  liked,
  likesCount,
  onClose, 
  onRead, 
  onToggleBookmark,
  onToggleLike
}) {
  if (!comic) return null;
  const isBookmarked = libraryEntry ? libraryEntry.bookmarked : false;

  return (
    <div className="dialog-overlay" onClick={(e) => e.target.classList.contains('dialog-overlay') && onClose()}>
      <div className="modal-content glass-panel">
        <div className="modal-header">
          <h2 className="modal-title">Book Summary</h2>
          <button type="button" className="close-modal-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <div className="detail-layout">
            <img className="detail-cover" src={comic.cover} alt={comic.title} />
            <div className="detail-info">
              <h2 className="detail-title">{comic.title}</h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>By {comic.author}</span>
              
              <div className="detail-badge-row" style={{ alignItems: 'center' }}>
                <span className="comic-badge badge-free" style={{ position: 'static', background: 'var(--color-secondary)' }}>
                  {comic.category}
                </span>
                <button 
                  type="button" 
                  className={`like-heart-btn ${liked ? 'liked' : ''}`}
                  onClick={onToggleLike}
                  style={{ paddingBlock: '0.25rem', paddingInline: '0.6rem' }}
                >
                  ❤️ {likesCount}
                </button>
              </div>
              
              <div className="detail-metadata">
                <span>⭐ {comic.rating} ({comic.reviews} reviews)</span>
                <span>•</span>
                <span>📄 {comic.pages} Pages</span>
                <span>•</span>
                <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>Free to Read</span>
              </div>
              
              <p className="detail-desc">{comic.synopsis}</p>
              
              <div className="detail-actions">
                <button type="button" className="detail-btn card-btn-primary" onClick={onRead}>
                  📖 Read Now
                </button>
                <button type="button" className="detail-btn card-btn-secondary" onClick={onToggleBookmark}>
                  ⭐ {isBookmarked ? 'Remove From Library' : 'Add to Library'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
