import React, { useState, useEffect } from 'react';

export default function ComicReader({ 
  comic, 
  comicsList, 
  initialPage, 
  onClose, 
  onComicChange,
  onProgressUpdate 
}) {
  const [currentPage, setCurrentPage] = useState(initialPage || 1);
  const [layoutMode, setLayoutMode] = useState('fit-height'); // fit-height, scroll

  // Sync page state when book/comic changes
  useEffect(() => {
    setCurrentPage(1);
  }, [comic.id]);

  // Notify parent of progress
  useEffect(() => {
    onProgressUpdate(currentPage);
  }, [currentPage, comic.id]);

  const handleNextPage = () => {
    if (currentPage < comic.pages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageSelect = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const activePanel = comic.panels.find(p => p.page === currentPage) || comic.panels[0];

  return (
    <div className="comic-reader theme-dark cr-reader-style">
      
      {/* Top Navbar: Crunchyroll style */}
      <header className="reader-header cr-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button 
            type="button" 
            className="reader-control-btn cr-back-btn" 
            onClick={onClose}
            aria-label="Back to Catalog"
          >
            ← Back
          </button>
          
          <div className="cr-dropdown-group">
            <label htmlFor="chapter-select" style={{ fontSize: '0.7rem', color: 'var(--color-warning)', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
              Select Issue / Book
            </label>
            <select 
              id="chapter-select"
              className="cr-select"
              value={comic.id}
              onChange={(e) => onComicChange(e.target.value)}
            >
              {comicsList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="cr-nav-info">
          <span style={{ fontSize: '1rem', fontWeight: '700' }}>
            Page {currentPage} / {comic.pages}
          </span>
        </div>

        <div className="reader-controls">
          <button 
            type="button" 
            className={`reader-control-btn ${layoutMode === 'fit-height' ? 'active' : ''}`}
            onClick={() => setLayoutMode('fit-height')}
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            📺 Fit Screen
          </button>
          <button 
            type="button" 
            className={`reader-control-btn ${layoutMode === 'scroll' ? 'active' : ''}`}
            onClick={() => setLayoutMode('scroll')}
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            📜 Webtoon Scroll
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className={`reader-canvas cr-canvas ${layoutMode === 'scroll' ? 'scroll-view' : 'fit-view'}`}>
        
        {layoutMode === 'scroll' ? (
          <div className="webtoon-container cr-webtoon">
            {comic.panels.map(p => (
              <div key={p.page} className="webtoon-page cr-webtoon-page">
                <div className="comic-panel-grid">
                  <div className="comic-panel comic-panel-large">
                    <span className="panel-label">PAGE {p.page}</span>
                    <div className="comic-panel-art" dangerouslySetInnerHTML={{ __html: p.svg }} />
                    {p.bubbles.map((b, idx) => (
                      <div key={idx} className={`panel-bubble ${b.position}`}>{b.text}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="webtoon-footer">
              <h3>End of Book</h3>
              <p>You have finished reading {comic.title}.</p>
            </div>
          </div>
        ) : (
          /* Single Page Viewport with Side Navigation Overlays */
          <div className="cr-single-viewport">
            <button 
              type="button" 
              className="cr-nav-overlay left" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <span>◀</span>
            </button>

            <div className="comic-page-card cr-page-card">
              <div className="comic-panel-grid">
                <div className="comic-panel comic-panel-large">
                  <span className="panel-label">PAGE {activePanel.page} • {activePanel.label}</span>
                  <div className="comic-panel-art" dangerouslySetInnerHTML={{ __html: activePanel.svg }} />
                  {activePanel.bubbles.map((b, idx) => (
                    <div key={idx} className={`panel-bubble ${b.position}`}>{b.text}</div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className="cr-nav-overlay right" 
              onClick={handleNextPage}
              disabled={currentPage === comic.pages}
              aria-label="Next Page"
            >
              <span>▶</span>
            </button>
          </div>
        )}
      </main>

      {/* Bottom Page Scrubber / Thumbnail bar */}
      {layoutMode === 'fit-height' && (
        <footer className="cr-scrubber-bar">
          <div className="cr-scrubber-track">
            {comic.panels.map(p => (
              <button
                key={p.page}
                type="button"
                className={`cr-thumb-btn ${currentPage === p.page ? 'active' : ''}`}
                onClick={() => handlePageSelect(p.page)}
              >
                <div className="cr-thumb-preview" dangerouslySetInnerHTML={{ __html: p.svg }} />
                <span className="cr-thumb-num">Pg {p.page}</span>
              </button>
            ))}
          </div>
        </footer>
      )}
      
    </div>
  );
}
