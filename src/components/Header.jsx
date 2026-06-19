import React, { useState, useRef, useEffect } from 'react';

export default function Header({ 
  username, 
  onLogout,
  activeTab,
  onSwitchTab,
  currentCategory,
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  librarySubTab,
  showToast
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const genresList = ['All', 'Marvel', 'DC', 'Disney', 'Fantasy', 'Horror', 'Adventure', 'Crime Thriller'];

  // Handle clicking outside the profile dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.substring(0, 2).toUpperCase();
  };

  const handleGenreClick = (genre) => {
    onSelectCategory(genre);
    onSwitchTab('store'); // Force redirect to shop/catalog store
  };

  return (
    <header className="app-header top-nav">
      
      {/* Brand logo & title */}
      <div 
        className="brand" 
        onClick={() => { onSwitchTab('store'); onSelectCategory('All'); }}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
      >
        <div className="brand-logo-burst">
          <span className="lightning-bolt-icon">⚡</span>
        </div>
        <h1 className="brand-name">
          <span>Comic</span><span>Company</span>
        </h1>
      </div>

      {/* Center navigation links (only when logged in) */}
      {username && (
        <nav aria-label="Primary top-nav">
          <ul className="nav-links-horizontal">
            <li className={activeTab === 'store' && currentCategory === 'All' ? 'active' : ''}>
              <button 
                type="button" 
                className="nav-link-btn"
                onClick={() => { onSwitchTab('store'); onSelectCategory('All'); }}
              >
                Browse
              </button>
            </li>
            
            {/* Hoverable Categories Dropdown */}
            <li className="nav-dropdown">
              <button type="button" className="nav-link-btn">
                Categories ▾
              </button>
              <div className="nav-dropdown-content">
                {genresList.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    className="nav-dropdown-item"
                    onClick={() => handleGenreClick(genre)}
                  >
                    {genre === 'All' ? 'All Genres' : genre}
                  </button>
                ))}
              </div>
            </li>

            <li className={activeTab === 'library' ? 'active' : ''}>
              <button 
                type="button" 
                className="nav-link-btn"
                onClick={() => onSwitchTab('library')}
              >
                My Library
              </button>
            </li>
            
            <li className={activeTab === 'liked' ? 'active' : ''}>
              <button 
                type="button" 
                className="nav-link-btn"
                onClick={() => onSwitchTab('liked')}
              >
                Liked Books
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Right side items */}
      <div className="header-actions-right">
        {username ? (
          <>
            {/* Inline Search Bar */}
            <div className="search-bar-header" aria-label="Header search">
              <span className="search-icon-header">🔍</span>
              <input 
                type="search" 
                placeholder="Search comics..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Premium crown tag badge */}
            <div className="premium-crown-btn" title="Your account is premium!">
              👑 Premium
            </div>

            {/* Watchlist shortcut button */}
            <button 
              type="button" 
              className="watchlist-shortcut-btn"
              onClick={() => onSwitchTab('library')}
              title="View your bookmarked Library"
            >
              🔖
            </button>

            {/* User Profile Avatar dropdown */}
            <div className="user-avatar-container" ref={dropdownRef}>
              <button 
                type="button" 
                className="user-avatar-circle"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                title="Profile actions"
              >
                {getInitials(username)}
              </button>

              {profileDropdownOpen && (
                <div className="extended-profile-menu">
                  {/* User header section */}
                  <div className="profile-menu-header">
                    <div className="profile-menu-avatar-circle">
                      {getInitials(username)}
                    </div>
                    <div className="profile-menu-user-details">
                      <span className="profile-menu-username">@{username}</span>
                      <button 
                        type="button" 
                        className="profile-menu-edit-btn" 
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onSwitchTab('edit-profile');
                        }}
                        title="Edit Profile"
                      >
                        ✏️
                      </button>
                    </div>
                  </div>

                  {/* Premium Status button */}
                  <div className="profile-menu-premium-wrapper">
                    <button 
                      type="button" 
                      className="promo-gold-btn" 
                      onClick={() => {
                        if (showToast) {
                          showToast('👑 Premium status active! Unlimited ad-free reading.', 'success');
                        } else {
                          alert('👑 Premium status active! Unlimited ad-free reading.');
                        }
                      }}
                    >
                      👑 Premium Unlocked
                    </button>
                  </div>

                  <div className="profile-menu-divider"></div>

                  {/* Section 1: Switch Profile, Settings */}
                  <div className="profile-menu-section">
                    <button 
                      type="button" 
                      className="profile-menu-item" 
                      onClick={() => {
                        if (showToast) {
                          showToast('Multi-profile support is simulated. Logged in as Master account.', 'info');
                        } else {
                          alert('Multi-profile support is simulated. Logged in as Master account.');
                        }
                      }}
                    >
                      👥 Switch Profile
                    </button>
                    <button 
                      type="button" 
                      className="profile-menu-item" 
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchTab('settings');
                      }}
                    >
                      ⚙️ Settings
                    </button>
                  </div>

                  <div className="profile-menu-divider"></div>

                  {/* Section 2: Watchlist, Crunchylists, History */}
                  <div className="profile-menu-section">
                    <button 
                      type="button" 
                      className={`profile-menu-item ${activeTab === 'library' && librarySubTab === 'watchlist' ? 'active-item' : ''}`}
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchTab('library-watchlist');
                      }}
                    >
                      🔖 Watchlist
                    </button>
                    <button 
                      type="button" 
                      className={`profile-menu-item ${activeTab === 'library' && librarySubTab === 'crunchylists' ? 'active-item' : ''}`}
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchTab('library-crunchylists');
                      }}
                    >
                      🗂️ Crunchylists
                    </button>
                    <button 
                      type="button" 
                      className={`profile-menu-item ${activeTab === 'library' && librarySubTab === 'history' ? 'active-item' : ''}`}
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onSwitchTab('library-history');
                      }}
                    >
                      🕒 History
                    </button>
                  </div>

                  <div className="profile-menu-divider"></div>

                  {/* Section 3: Notifications, Gift Card */}
                  <div className="profile-menu-section">
                    <button 
                      type="button" 
                      className="profile-menu-item" 
                      onClick={() => {
                        if (showToast) {
                          showToast('All notifications read. No pending alerts!', 'success');
                        } else {
                          alert('All notifications read. No pending alerts!');
                        }
                      }}
                    >
                      🔔 Notifications
                    </button>
                    <button 
                      type="button" 
                      className="profile-menu-item" 
                      onClick={() => {
                        if (showToast) {
                          showToast('Gift card code redemption is simulated in this version.', 'info');
                        } else {
                          alert('Gift card code redemption is simulated in this version.');
                        }
                      }}
                    >
                      🎁 Gift Card
                    </button>
                  </div>

                  <div className="profile-menu-divider"></div>

                  {/* Section 4: Log Out */}
                  <div className="profile-menu-section">
                    <button 
                      type="button" 
                      className="profile-menu-item logout-item" 
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onLogout();
                      }}
                    >
                      🚪 Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>
            College Demo Showcase
          </div>
        )}
      </div>
    </header>
  );
}
