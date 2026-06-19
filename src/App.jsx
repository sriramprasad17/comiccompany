import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComicCard from './components/ComicCard';
import ComicDetailsModal from './components/ComicDetailsModal';
import AuthScreen from './components/AuthScreen';
import ComicReader from './components/ComicReader';
import { COMICS_DATABASE } from './data/comics';

export default function App() {
  // Authentication states
  const [user, setUser] = useState(() => {
    return localStorage.getItem('comic_company_user') || null;
  });
  const [isSubscribed, setIsSubscribed] = useState(() => {
    return localStorage.getItem('comic_company_subscribed') === 'true';
  });

  // Library & Social states
  const [library, setLibrary] = useState(() => {
    return JSON.parse(localStorage.getItem('comic_company_library')) || [];
  });
  const [likedComics, setLikedComics] = useState(() => {
    return JSON.parse(localStorage.getItem('comic_company_liked')) || [];
  });
  const [likesCount, setLikesCount] = useState(() => {
    const saved = localStorage.getItem('comic_company_likes_count');
    if (saved) return JSON.parse(saved);
    // Initial mock likes
    return {
      'spider-man-web': 124,
      'batman-knightfall': 98,
      'mickey-mouse-magic': 45,
      'chronicles-aethelgard': 76,
      'whispering-shadows': 32
    };
  });

  // UI Filter states
  const [currentCategory, setCurrentCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('store'); // 'store', 'library', 'liked'
  const [librarySubTab, setLibrarySubTab] = useState('watchlist'); // 'watchlist', 'history'
  const [selectedComic, setSelectedComic] = useState(null);

  // Settings States
  const [settingsSubTab, setSettingsSubTab] = useState('preferences'); // 'preferences', 'membership', etc.
  const [displayLanguage, setDisplayLanguage] = useState('English (US)');
  const [audioLanguage, setAudioLanguage] = useState('English');
  const [audioDescriptions, setAudioDescriptions] = useState(false);
  const [subtitlesLanguage, setSubtitlesLanguage] = useState('English');
  const [closedCaptions, setClosedCaptions] = useState(false);

  // Edit Profile States
  const [editProfileName, setEditProfileName] = useState('');
  const [editUsername, setEditUsername] = useState('');

  // Crunchylists States
  const [crunchylists, setCrunchylists] = useState(() => {
    return JSON.parse(localStorage.getItem('comic_company_crunchylists')) || [];
  });
  const [selectedCrunchylistId, setSelectedCrunchylistId] = useState(null);
  const [activeCrunchylist, setActiveCrunchylist] = useState(null);

  const [readerComic, setReaderComic] = useState(null);
  const [toasts, setToasts] = useState([]);
  
  // Simulated Alert Banner
  const [showEmailBanner, setShowEmailBanner] = useState(true);

  // Carousel slideshow slide index state
  const [currentSlide, setCurrentSlide] = useState(0);

  // List of featured comics for the hero slider carousel
  const featuredComics = COMICS_DATABASE.filter(c => 
    ['spider-man-web', 'batman-knightfall', 'lion-king-destiny', 'indiana-jones-lost'].includes(c.id)
  );

  // Persistence effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('comic_company_user', user);
    } else {
      localStorage.removeItem('comic_company_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('comic_company_subscribed', isSubscribed.toString());
  }, [isSubscribed]);

  useEffect(() => {
    localStorage.setItem('comic_company_library', JSON.stringify(library));
  }, [library]);

  useEffect(() => {
    localStorage.setItem('comic_company_liked', JSON.stringify(likedComics));
  }, [likedComics]);

  useEffect(() => {
    localStorage.setItem('comic_company_likes_count', JSON.stringify(likesCount));
  }, [likesCount]);

  useEffect(() => {
    if (activeTab === 'edit-profile' && user) {
      setEditProfileName(user);
      setEditUsername(user.toLowerCase().replace(/\s+/g, ''));
    }
  }, [activeTab, user]);

  useEffect(() => {
    localStorage.setItem('comic_company_crunchylists', JSON.stringify(crunchylists));
  }, [crunchylists]);

  // Carousel Auto-Play Timer
  useEffect(() => {
    // Only auto-play if reader is closed, user is logged in, and they are browsing the main home screen
    if (readerComic || !user || activeTab !== 'store' || searchQuery !== '' || currentCategory !== 'All') return;
    
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredComics.length);
    }, 5500);
    
    return () => clearInterval(timer);
  }, [readerComic, user, activeTab, searchQuery, currentCategory, featuredComics.length]);

  // Toast notification helper
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Auth flow callbacks
  const handleLoginSuccess = (usernameVal) => {
    setUser(usernameVal);
    setIsSubscribed(true);
    showToast(`Logged in successfully! Welcome ${usernameVal}.`, 'success');
    triggerConfetti();
  };

  const handleLogout = () => {
    setUser(null);
    setIsSubscribed(false);
    setActiveTab('store');
    setSettingsSubTab('preferences');
    setLibrarySubTab('watchlist');
    setSelectedCrunchylistId(null);
    setActiveCrunchylist(null);
    setCurrentCategory('All');
    setSearchQuery('');
    showToast('Signed out successfully.', 'info');
  };

  // Bookmark / Library managers
  const handleToggleBookmark = (comicId) => {
    const comic = COMICS_DATABASE.find(c => c.id === comicId);
    if (!comic) return;

    const existingIdx = library.findIndex(item => item.id === comicId);
    if (existingIdx > -1) {
      const updated = [...library];
      const entry = updated[existingIdx];
      entry.bookmarked = !entry.bookmarked;

      if (!entry.owned && !entry.bookmarked && entry.progress === 0) {
        updated.splice(existingIdx, 1);
        showToast(`Removed "${comic.title}" from library`, 'info');
      } else {
        showToast(entry.bookmarked ? `Added "${comic.title}" to library` : `Removed "${comic.title}" from library`, 'success');
      }
      setLibrary(updated);
    } else {
      setLibrary(prev => [...prev, {
        id: comicId,
        owned: true,
        bookmarked: true,
        progress: 0
      }]);
      showToast(`Added "${comic.title}" to library`, 'success');
    }
  };

  // Liked toggler managers
  const handleToggleLike = (comicId) => {
    const isLiked = likedComics.includes(comicId);
    let updatedLikes = [...likedComics];
    let updatedCounts = { ...likesCount };

    if (isLiked) {
      updatedLikes = updatedLikes.filter(id => id !== comicId);
      updatedCounts[comicId] = Math.max(0, (updatedCounts[comicId] || 1) - 1);
      showToast('Removed from liked list', 'info');
    } else {
      updatedLikes.push(comicId);
      updatedCounts[comicId] = (updatedCounts[comicId] || 0) + 1;
      showToast('Liked this comic book! ❤️', 'success');
    }

    setLikedComics(updatedLikes);
    setLikesCount(updatedCounts);
  };

  const handleProgressUpdate = (comicId, pageNum) => {
    setLibrary(prevLib => {
      const updated = [...prevLib];
      const idx = updated.findIndex(i => i.id === comicId);
      if (idx > -1) {
        updated[idx].progress = Math.max(updated[idx].progress || 0, pageNum);
      } else {
        updated.push({
          id: comicId,
          owned: true,
          bookmarked: false,
          progress: pageNum
        });
      }
      return updated;
    });
  };

  const handleCreateCrunchylist = () => {
    const listName = prompt("Enter a name for your new Crunchylist:");
    if (listName && listName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: listName.trim(),
        comics: []
      };
      setCrunchylists(prev => [...prev, newList]);
      showToast(`Created Crunchylist "${listName.trim()}"!`, 'success');
    }
  };

  const handleSwitchTab = (tabId) => {
    if (tabId === 'library-watchlist') {
      setActiveTab('library');
      setLibrarySubTab('watchlist');
    } else if (tabId === 'library-crunchylists') {
      setActiveTab('library');
      setLibrarySubTab('crunchylists');
    } else if (tabId === 'library-history') {
      setActiveTab('library');
      setLibrarySubTab('history');
    } else {
      setActiveTab(tabId);
    }
  };

  // Filter Catalog
  const getFilteredComics = () => {
    return COMICS_DATABASE.filter(comic => {
      const matchesCategory = currentCategory === 'All' || comic.category === currentCategory;
      const matchesSearch = comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comic.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            comic.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeTab === 'library') {
        const libEntry = library.find(item => item.id === comic.id);
        if (!libEntry) return false;
        if (librarySubTab === 'history') {
          return matchesCategory && matchesSearch && (libEntry.progress > 0);
        }
        return matchesCategory && matchesSearch && libEntry.bookmarked;
      }
      if (activeTab === 'liked') {
        return matchesCategory && matchesSearch && likedComics.includes(comic.id);
      }
      return matchesCategory && matchesSearch;
    });
  };

  // Confetti helper
  const triggerConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colors = ['#ff3333', '#9d4edd', '#ff477e', '#f39c12', '#10b981'];
    const particles = [];
    
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * canvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0
      });
    }
    
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle);
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;
        
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      });
      update();
    }
    
    let animationId;
    function update() {
      let remaining = 0;
      particles.forEach(p => {
        if (p.y < canvas.height) remaining++;
      });
      
      if (remaining > 0) {
        animationId = requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }
    
    draw();
    setTimeout(() => {
      cancelAnimationFrame(animationId);
      canvas.remove();
    }, 5000);
  };

  const filteredComics = getFilteredComics();

  // Route Views gating
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header username={null} onLogout={null} />
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
        <div className="toast-container" aria-live="polite">
          {toasts.map(t => (
            <div key={t.id} className={`toast toast-${t.type}`}>
              <span>{t.type === 'success' ? '✅' : 'ℹ️'}</span>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Grouping books for Discover home shelves
  const shelfMostPopular = COMICS_DATABASE.filter(c => 
    ['spider-man-web', 'batman-knightfall', 'lion-king-destiny', 'chronicles-aethelgard'].includes(c.id)
  );
  const shelfSuperhero = COMICS_DATABASE.filter(c => c.category === 'Marvel' || c.category === 'DC');
  const shelfMysteryThriller = COMICS_DATABASE.filter(c => c.category === 'Crime Thriller' || c.category === 'Horror');
  const shelfDisneyMagic = COMICS_DATABASE.filter(c => c.category === 'Disney');

  // Determine if we should show the Discover page layout (slideshow + category shelves)
  // We only show it if the user is on the main store tab, has NOT entered any search keyword, and has NOT clicked any specific category filter chip.
  const showDiscoverHome = activeTab === 'store' && searchQuery === '' && currentCategory === 'All';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0b0c10' }}>
      
      {/* Header top-navigation bar */}
      <Header 
        username={user} 
        onLogout={handleLogout}
        activeTab={activeTab}
        onSwitchTab={handleSwitchTab}
        currentCategory={currentCategory}
        onSelectCategory={setCurrentCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        librarySubTab={librarySubTab}
        showToast={showToast}
      />

      {/* Simulated Email Verification alert banner */}
      {showEmailBanner && (
        <div className="verification-banner" role="alert">
          <div>
            📧 To fully enjoy Comic Company, please verify your email address. 
            <a href="#verify" onClick={(e) => { e.preventDefault(); showToast('Verification email resent!', 'success'); }}>Send verification link</a>
          </div>
          <button 
            type="button" 
            className="verification-banner-close" 
            onClick={() => setShowEmailBanner(false)}
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main content grid area */}
      <div className="app-container full-width">
        <main style={{ width: '100%' }}>
          
          {activeTab === 'edit-profile' ? (
            /* Crunchyroll Edit Profile Page Layout */
            <div className="edit-profile-container">
              <h1 className="edit-profile-page-title">Edit Profile</h1>
              
              <div className="edit-profile-card">
                {/* Banner Section */}
                <div className="edit-profile-banner">
                  <button 
                    type="button" 
                    className="edit-banner-pencil-btn"
                    onClick={() => showToast('Banner image edit is simulated in this presentation.', 'info')}
                    title="Edit Banner"
                  >
                    ✏️
                  </button>
                  
                  {/* Circular Avatar */}
                  <div className="edit-profile-avatar-circle">
                    {user ? user.substring(0, 2).toUpperCase() : 'U'}
                    <button 
                      type="button" 
                      className="edit-avatar-pencil-btn"
                      onClick={() => showToast('Avatar picture edit is simulated in this presentation.', 'info')}
                      title="Edit Avatar"
                    >
                      ✏️
                    </button>
                  </div>
                </div>

                {/* Form Content */}
                <div className="edit-profile-form">
                  <div className="edit-profile-form-group">
                    <label className="edit-profile-label">Profile Name</label>
                    <input 
                      type="text" 
                      className="edit-profile-input-flat"
                      value={editProfileName}
                      onChange={(e) => setEditProfileName(e.target.value)}
                      maxLength={20}
                    />
                    <span className="edit-profile-subtext">This is seen within your household and can be changed anytime.</span>
                  </div>

                  <div className="edit-profile-form-group" style={{ marginTop: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label className="edit-profile-label">Username (Optional)</label>
                      <button 
                        type="button" 
                        className="edit-profile-randomize-btn"
                        onClick={() => {
                          const funnySuffixes = ['Otaku', 'Sensei', 'Hokage', 'Vortex', 'Reader', 'Pulse', 'Chaser', 'Slayer'];
                          const randomNum = Math.floor(Math.random() * 900) + 100;
                          const randomWord = funnySuffixes[Math.floor(Math.random() * funnySuffixes.length)];
                          const generated = `${user ? user.toLowerCase().replace(/\s+/g, '') : 'user'}_${randomWord}${randomNum}`;
                          setEditUsername(generated);
                          showToast('Username randomized!', 'success');
                        }}
                      >
                        RANDOMIZE
                      </button>
                    </div>
                    <input 
                      type="text" 
                      className="edit-profile-input-flat"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      maxLength={30}
                    />
                    <span className="edit-profile-subtext">Create a Username to be ready for future experiences that'll share your love for anime! Pick one you love, it can't be changed!</span>
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="edit-profile-actions">
                  <button 
                    type="button" 
                    className="edit-profile-save-btn"
                    onClick={() => {
                      if (!editProfileName.trim()) {
                        showToast('Profile name cannot be empty!', 'error');
                        return;
                      }
                      setUser(editProfileName.trim());
                      showToast('Profile updated successfully!', 'success');
                      setActiveTab('store');
                    }}
                  >
                    SAVE
                  </button>
                  <button 
                    type="button" 
                    className="edit-profile-cancel-btn"
                    onClick={() => {
                      setActiveTab('store');
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            /* Crunchyroll Account Settings Page Layout */
            <div className="account-settings-container">
              <h1 className="settings-page-title">Account Settings</h1>
              
              <div className="settings-layout">
                {/* Left Sidebar */}
                <aside className="settings-sidebar">
                  <div className="settings-sidebar-group">
                    <h4 className="settings-group-title">General</h4>
                    <ul className="settings-group-list">
                      <li className={settingsSubTab === 'membership' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('membership')}>Membership Info</button>
                      </li>
                      <li className={settingsSubTab === 'preferences' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('preferences')}>Preferences</button>
                      </li>
                      <li className={settingsSubTab === 'profile-pin' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('profile-pin')}>Profile PIN</button>
                      </li>
                      <li className={settingsSubTab === 'notifications' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('notifications')}>Email Notifications</button>
                      </li>
                      <li className={settingsSubTab === 'devices' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('devices')}>Device Management</button>
                      </li>
                      <li className={settingsSubTab === 'apps' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('apps')}>Connected Apps</button>
                      </li>
                    </ul>
                  </div>

                  <div className="settings-sidebar-group">
                    <h4 className="settings-group-title">Account</h4>
                    <ul className="settings-group-list">
                      <li className={settingsSubTab === 'email' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('email')}>Email</button>
                      </li>
                      <li className={settingsSubTab === 'phone' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('phone')}>Phone</button>
                      </li>
                      <li className={settingsSubTab === 'password' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('password')}>Password</button>
                      </li>
                    </ul>
                  </div>

                  <div className="settings-sidebar-group">
                    <h4 className="settings-group-title">Purchase & Credit</h4>
                    <ul className="settings-group-list">
                      <li className={settingsSubTab === 'payment' ? 'active' : ''}>
                        <button type="button" onClick={() => setSettingsSubTab('payment')}>Payment Methods</button>
                      </li>
                    </ul>
                  </div>
                </aside>

                {/* Right Panel */}
                <div className="settings-main-panel">
                  {settingsSubTab === 'preferences' && (
                    <div className="settings-panel-content">
                      <h2 className="settings-panel-header-title">Preferences for {user}</h2>
                      <p className="settings-panel-header-desc">Set your language and video preferences</p>
                      
                      <div className="settings-form-group">
                        <label className="settings-label">Display Language</label>
                        <div className="settings-select-wrapper">
                          <select 
                            value={displayLanguage} 
                            onChange={(e) => {
                              setDisplayLanguage(e.target.value);
                              showToast('Display Language updated!', 'success');
                            }}
                            className="settings-select"
                          >
                            <option value="English (US)">English (US)</option>
                            <option value="English (UK)">English (UK)</option>
                            <option value="Español">Español</option>
                            <option value="Français">Français</option>
                            <option value="Deutsch">Deutsch</option>
                            <option value="Português">Português</option>
                            <option value="日本語">日本語</option>
                          </select>
                        </div>
                      </div>

                      <div className="settings-form-group">
                        <label className="settings-label">Audio Language</label>
                        <div className="settings-select-wrapper">
                          <select 
                            value={audioLanguage} 
                            onChange={(e) => {
                              setAudioLanguage(e.target.value);
                              showToast('Audio Language updated!', 'success');
                            }}
                            className="settings-select"
                          >
                            <option value="English">English</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                          </select>
                        </div>
                      </div>

                      <div className="settings-form-row">
                        <div className="settings-row-text">
                          <label className="settings-label" style={{ marginBottom: '2px' }}>Audio Descriptions</label>
                          <span className="settings-row-note">By enabling this setting, we will automatically play audio descriptions when available. <a href="#faq" onClick={(e) => e.preventDefault()} className="settings-link">Audio Description FAQ</a></span>
                        </div>
                        <button 
                          type="button" 
                          className={`settings-toggle-switch ${audioDescriptions ? 'on' : ''}`}
                          onClick={() => {
                            setAudioDescriptions(!audioDescriptions);
                            showToast(`Audio Descriptions ${!audioDescriptions ? 'enabled' : 'disabled'}`, 'info');
                          }}
                          aria-label="Toggle Audio Descriptions"
                        >
                          <div className="settings-toggle-handle" />
                        </button>
                      </div>

                      <div className="settings-form-group">
                        <label className="settings-label">Subtitles/CC Language</label>
                        <div className="settings-select-wrapper">
                          <select 
                            value={subtitlesLanguage} 
                            onChange={(e) => {
                              setSubtitlesLanguage(e.target.value);
                              showToast('Subtitles Language updated!', 'success');
                            }}
                            className="settings-select"
                          >
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="None">None</option>
                          </select>
                        </div>
                      </div>

                      <div className="settings-form-row">
                        <div className="settings-row-text">
                          <label className="settings-label" style={{ marginBottom: '2px' }}>Closed Captions</label>
                          <span className="settings-row-note">By enabling this setting, we will automatically display closed captions when available.</span>
                        </div>
                        <button 
                          type="button" 
                          className={`settings-toggle-switch ${closedCaptions ? 'on' : ''}`}
                          onClick={() => {
                            setClosedCaptions(!closedCaptions);
                            showToast(`Closed Captions ${!closedCaptions ? 'enabled' : 'disabled'}`, 'info');
                          }}
                          aria-label="Toggle Closed Captions"
                        >
                          <div className="settings-toggle-handle" />
                        </button>
                      </div>
                    </div>
                  )}

                  {settingsSubTab !== 'preferences' && (
                    <div className="settings-panel-content">
                      <h2 className="settings-panel-header-title" style={{ textTransform: 'capitalize' }}>
                        {settingsSubTab.replace('-', ' ')}
                      </h2>
                      <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                          This section is simulated for the college demo presentation. All subscription levels have been unlocked.
                        </p>
                        {settingsSubTab === 'membership' && (
                          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                            <span style={{ color: '#eab308', fontWeight: 'bold', fontSize: '1.2rem' }}>👑 PREMIUM LEVEL MEMBERSHIP</span>
                            <span style={{ fontSize: '0.9rem', color: '#b4b6c3' }}>Status: Active (Infinite Access)</span>
                          </div>
                        )}
                        {settingsSubTab === 'email' && (
                          <div style={{ marginTop: '1.5rem', maxWidth: '400px', marginInline: 'auto' }}>
                            <label className="settings-label">Your Email</label>
                            <input type="text" className="settings-input" value="sriramprasadkotha@demo.com" readOnly />
                            <button type="button" className="btn-hero-play" style={{ marginTop: '1rem', width: '100%' }} onClick={() => showToast('Email update is simulated!', 'info')}>Change Email</button>
                          </div>
                        )}
                        {settingsSubTab === 'phone' && (
                          <div style={{ marginTop: '1.5rem', maxWidth: '400px', marginInline: 'auto' }}>
                            <label className="settings-label">Phone Number</label>
                            <input type="text" className="settings-input" value="+1 (555) 019-2834" readOnly />
                            <button type="button" className="btn-hero-play" style={{ marginTop: '1rem', width: '100%' }} onClick={() => showToast('Phone update is simulated!', 'info')}>Change Phone Number</button>
                          </div>
                        )}
                        {settingsSubTab === 'password' && (
                          <div style={{ marginTop: '1.5rem', maxWidth: '400px', marginInline: 'auto' }}>
                            <label className="settings-label">Current Password</label>
                            <input type="password" className="settings-input" value="••••••••••••" readOnly style={{ letterSpacing: '3px' }} />
                            <button type="button" className="btn-hero-play" style={{ marginTop: '1rem', width: '100%' }} onClick={() => showToast('Password change is simulated!', 'info')}>Reset Password</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : showDiscoverHome ? (
            /* Immersive Crunchyroll Discover Home Page layout */
            <>
              {/* Giant Hero Slideshow Carousel */}
              <section className="hero-carousel" aria-label="Featured comics slider">
                {featuredComics.map((comic, idx) => {
                  const isSlideBookmarked = library.find(item => item.id === comic.id)?.bookmarked || false;
                  
                  return (
                    <div key={comic.id} className={`hero-slide ${idx === currentSlide ? 'active' : ''}`}>
                      
                      {/* Background blending graphics */}
                      <div className="hero-slide-bg">
                        <div className="hero-slide-bg-gradient" />
                        <div 
                          className="hero-slide-bg-artwork" 
                          style={{ backgroundImage: `url(${comic.cover})` }}
                        />
                      </div>

                      {/* Info Text overlays */}
                      <div className="hero-slide-content">
                        <span className="hero-slide-brand-badge">{comic.category} Spotlight</span>
                        <h2 className="hero-slide-title">{comic.title}</h2>
                        
                        <div className="hero-slide-meta">
                          <span className="rating-badge">A</span>
                          <span className="divider" />
                          <span>Sub | Dub</span>
                          <span className="divider" />
                          <span>{comic.category}</span>
                          <span className="divider" />
                          <span>⭐ {comic.rating}</span>
                        </div>

                        <p className="hero-slide-desc">{comic.synopsis}</p>
                        
                        <div className="hero-slide-actions">
                          <button 
                            type="button" 
                            className="btn-hero-play"
                            onClick={() => setReaderComic(comic)}
                          >
                            📖 Start Reading
                          </button>
                          
                          <button 
                            type="button" 
                            className={`btn-hero-watchlist ${isSlideBookmarked ? 'active' : ''}`}
                            onClick={() => handleToggleBookmark(comic.id)}
                            title={isSlideBookmarked ? "Remove from Library" : "Add to Library"}
                          >
                            🔖
                          </button>
                        </div>
                      </div>

                      {/* Right-aligned 3D Graphic element */}
                      <div className="hero-slide-media">
                        <img 
                          className="hero-slide-cover-3d" 
                          src={comic.cover} 
                          alt={`Featured Cover of ${comic.title}`}
                        />
                      </div>

                    </div>
                  );
                })}

                {/* Left/Right manual arrow toggles */}
                <button 
                  type="button" 
                  className="carousel-control-arrow prev"
                  onClick={() => setCurrentSlide(prev => (prev - 1 + featuredComics.length) % featuredComics.length)}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button 
                  type="button" 
                  className="carousel-control-arrow next"
                  onClick={() => setCurrentSlide(prev => (prev + 1) % featuredComics.length)}
                  aria-label="Next slide"
                >
                  ›
                </button>

                {/* Bottom indicators dots */}
                <div className="carousel-indicators-dots">
                  {featuredComics.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      className={`carousel-indicator-dot ${idx === currentSlide ? 'active' : ''}`}
                      aria-label={`Slide number ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>

              {/* Horizontal Scroll Shelves Rows */}
              <div className="discover-sections-wrapper">
                
                {/* 1. Most Popular Shelf */}
                <section className="comic-shelf-container">
                  <h3 className="comic-shelf-title">Most Popular</h3>
                  <div className="comic-shelf">
                    {shelfMostPopular.map(comic => (
                      <ComicCard 
                        key={comic.id}
                        comic={comic}
                        libraryEntry={library.find(i => i.id === comic.id)}
                        liked={likedComics.includes(comic.id)}
                        likesCount={likesCount[comic.id] || 0}
                        onRead={() => setReaderComic(comic)}
                        onDetails={() => setSelectedComic(comic)}
                        onToggleBookmark={() => handleToggleBookmark(comic.id)}
                        onToggleLike={() => handleToggleLike(comic.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 2. Action & Superhero Shelf */}
                <section className="comic-shelf-container">
                  <h3 className="comic-shelf-title">Action &amp; Superhero</h3>
                  <div className="comic-shelf">
                    {shelfSuperhero.map(comic => (
                      <ComicCard 
                        key={comic.id}
                        comic={comic}
                        libraryEntry={library.find(i => i.id === comic.id)}
                        liked={likedComics.includes(comic.id)}
                        likesCount={likesCount[comic.id] || 0}
                        onRead={() => setReaderComic(comic)}
                        onDetails={() => setSelectedComic(comic)}
                        onToggleBookmark={() => handleToggleBookmark(comic.id)}
                        onToggleLike={() => handleToggleLike(comic.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 3. Mystery & Thriller Shelf */}
                <section className="comic-shelf-container">
                  <h3 className="comic-shelf-title">Mystery &amp; Thriller</h3>
                  <div className="comic-shelf">
                    {shelfMysteryThriller.map(comic => (
                      <ComicCard 
                        key={comic.id}
                        comic={comic}
                        libraryEntry={library.find(i => i.id === comic.id)}
                        liked={likedComics.includes(comic.id)}
                        likesCount={likesCount[comic.id] || 0}
                        onRead={() => setReaderComic(comic)}
                        onDetails={() => setSelectedComic(comic)}
                        onToggleBookmark={() => handleToggleBookmark(comic.id)}
                        onToggleLike={() => handleToggleLike(comic.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 4. Disney Magic Shelf */}
                <section className="comic-shelf-container">
                  <h3 className="comic-shelf-title">Disney Classics</h3>
                  <div className="comic-shelf">
                    {shelfDisneyMagic.map(comic => (
                      <ComicCard 
                        key={comic.id}
                        comic={comic}
                        libraryEntry={library.find(i => i.id === comic.id)}
                        liked={likedComics.includes(comic.id)}
                        likesCount={likesCount[comic.id] || 0}
                        onRead={() => setReaderComic(comic)}
                        onDetails={() => setSelectedComic(comic)}
                        onToggleBookmark={() => handleToggleBookmark(comic.id)}
                        onToggleLike={() => handleToggleLike(comic.id)}
                      />
                    ))}
                  </div>
                </section>

              </div>
            </>
          ) : (
            /* Standard Grid Area (Fallback when searching, filtering or on Library/Liked tabs) */
            <div className="app-content-grid-area">
              
              {activeTab === 'library' ? (
                <>
                  {/* Header Title centered */}
                  <h1 className="my-lists-header-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '2rem', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: '#ffffff' }}>
                    <span className="my-lists-icon" style={{ color: '#ff3333' }}>🔖</span> My Lists
                  </h1>

                  {/* Crunchyroll Subtabs Bar */}
                  <div className="library-subtabs-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', borderBottom: '1px solid #232533', marginBottom: '2rem', paddingBottom: '0px' }}>
                    <button 
                      type="button" 
                      className={`library-subtab-btn ${librarySubTab === 'watchlist' ? 'active' : ''}`}
                      onClick={() => { setLibrarySubTab('watchlist'); setSelectedCrunchylistId(null); }}
                    >
                      WATCHLIST
                    </button>
                    <button 
                      type="button" 
                      className={`library-subtab-btn ${librarySubTab === 'crunchylists' ? 'active' : ''}`}
                      onClick={() => setLibrarySubTab('crunchylists')}
                    >
                      CRUNCHYLISTS
                    </button>
                    <button 
                      type="button" 
                      className={`library-subtab-btn ${librarySubTab === 'history' ? 'active' : ''}`}
                      onClick={() => { setLibrarySubTab('history'); setSelectedCrunchylistId(null); }}
                    >
                      HISTORY
                    </button>
                  </div>

                  {/* Watchlist Subtab Content */}
                  {librarySubTab === 'watchlist' && (
                    filteredComics.length === 0 ? (
                      <div className="my-lists-empty-box">
                        <div className="my-lists-empty-svg">
                          <svg viewBox="0 0 200 200" width="160" height="160">
                            <rect x="50" y="80" width="100" height="20" rx="3" fill="#ff3333" />
                            <rect x="50" y="100" width="100" height="6" fill="#ffffff" opacity="0.8" />
                            <rect x="53" y="110" width="94" height="20" rx="3" fill="#9d4edd" />
                            <rect x="53" y="130" width="94" height="6" fill="#ffffff" opacity="0.8" />
                            <rect x="56" y="140" width="88" height="20" rx="3" fill="#ff3333" />
                            <rect x="56" y="160" width="88" height="6" fill="#ffffff" opacity="0.8" />
                            <path d="M120,40 C125,35 135,35 140,40 C145,45 145,55 140,60 L120,80 L100,60 C95,55 95,45 100,40 C105,35 115,35 120,40 Z" fill="#ff477e" opacity="0.75" />
                            <polygon points="50,30 55,40 65,42 57,50 60,60 50,55 40,60 43,50 35,42 45,40" fill="#facc15" />
                            <circle cx="160" cy="100" r="8" fill="#10b981" opacity="0.6" />
                            <circle cx="40" cy="100" r="5" fill="#f39c12" opacity="0.6" />
                          </svg>
                        </div>
                        <p className="my-lists-empty-message">
                          Your Watchlist needs some love. Let's fill it up with awesome comics.
                        </p>
                        <button 
                          type="button" 
                          className="my-lists-empty-action-btn"
                          onClick={() => { setActiveTab('store'); setCurrentCategory('All'); setSearchQuery(''); }}
                        >
                          GO TO HOME FEED
                        </button>
                      </div>
                    ) : (
                      <div className="comics-grid">
                        {filteredComics.map(comic => (
                          <ComicCard 
                            key={comic.id} 
                            comic={comic} 
                            libraryEntry={library.find(item => item.id === comic.id)} 
                            liked={likedComics.includes(comic.id)}
                            likesCount={likesCount[comic.id] || 0}
                            onRead={() => setReaderComic(comic)} 
                            onDetails={() => setSelectedComic(comic)} 
                            onToggleBookmark={() => handleToggleBookmark(comic.id)} 
                            onToggleLike={() => handleToggleLike(comic.id)}
                          />
                        ))}
                      </div>
                    )
                  )}

                  {/* Crunchylists Subtab Content */}
                  {librarySubTab === 'crunchylists' && (
                    selectedCrunchylistId ? (
                      /* Detail list view */
                      (() => {
                        const activeList = crunchylists.find(l => l.id === selectedCrunchylistId);
                        if (!activeList) {
                          setSelectedCrunchylistId(null);
                          return null;
                        }
                        const listComics = COMICS_DATABASE.filter(c => activeList.comics.includes(c.id));
                        
                        return (
                          <div className="crunchylist-detail-view" style={{ width: '100%' }}>
                            <button 
                              type="button" 
                              className="crunchylist-back-btn"
                              onClick={() => setSelectedCrunchylistId(null)}
                            >
                              ← Back to Crunchylists
                            </button>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                              <h2 style={{ margin: 0, color: '#ffffff', fontFamily: 'var(--font-display)', fontWeight: 800 }}>📂 {activeList.name}</h2>
                              <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <button 
                                  type="button" 
                                  className="btn-hero-play" 
                                  style={{ margin: 0, minWidth: '150px' }}
                                  onClick={() => setActiveCrunchylist(activeList)}
                                >
                                  Manage Comics
                                </button>
                                <button 
                                  type="button" 
                                  className="logout-header-btn" 
                                  style={{ backgroundColor: '#ef4444', color: '#ffffff', margin: 0, paddingInline: '1.25rem' }}
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${activeList.name}"?`)) {
                                      setCrunchylists(prev => prev.filter(l => l.id !== activeList.id));
                                      setSelectedCrunchylistId(null);
                                      showToast(`Deleted Crunchylist "${activeList.name}"`, 'info');
                                    }
                                  }}
                                >
                                  Delete List
                                </button>
                              </div>
                            </div>

                            {listComics.length === 0 ? (
                              <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                <h3>This list is empty</h3>
                                <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Add some comic books from your database to compile this collection.</p>
                                <button type="button" className="btn-hero-play" style={{ marginInline: 'auto', maxWidth: '200px' }} onClick={() => setActiveCrunchylist(activeList)}>Add Comics Now</button>
                              </div>
                            ) : (
                              <div className="comics-grid">
                                {listComics.map(comic => (
                                  <ComicCard 
                                    key={comic.id} 
                                    comic={comic} 
                                    libraryEntry={library.find(item => item.id === comic.id)} 
                                    liked={likedComics.includes(comic.id)}
                                    likesCount={likesCount[comic.id] || 0}
                                    onRead={() => setReaderComic(comic)} 
                                    onDetails={() => setSelectedComic(comic)} 
                                    onToggleBookmark={() => handleToggleBookmark(comic.id)} 
                                    onToggleLike={() => handleToggleLike(comic.id)}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()
                    ) : crunchylists.length === 0 ? (
                      <div className="my-lists-empty-box">
                        <div className="my-lists-empty-svg">
                          <svg viewBox="0 0 200 200" width="160" height="160">
                            <rect x="40" y="30" width="120" height="140" rx="6" fill="none" stroke="#d97706" strokeWidth="6" />
                            <line x1="40" y1="90" x2="160" y2="90" stroke="#d97706" strokeWidth="6" />
                            <line x1="40" y1="140" x2="160" y2="140" stroke="#d97706" strokeWidth="6" />
                            <ellipse cx="100" cy="118" rx="28" ry="16" fill="#64748b" />
                            <circle cx="80" cy="110" r="12" fill="#64748b" />
                            <polygon points="70,102 74,90 80,100" fill="#64748b" />
                            <polygon points="80,100 86,90 90,102" fill="#64748b" />
                            <path d="M128,118 C135,118 140,125 135,130 C130,135 120,132 118,124" fill="none" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
                            <path d="M72,112 Q76,116 80,112" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M82,112 Q86,116 90,112" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
                            <text x="130" y="65" fill="#a1a1aa" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Z</text>
                            <text x="140" y="50" fill="#a1a1aa" fontSize="10" fontWeight="bold" fontFamily="sans-serif">z</text>
                            <text x="148" y="40" fill="#a1a1aa" fontSize="8" fontWeight="bold" fontFamily="sans-serif">z</text>
                          </svg>
                        </div>
                        <p className="my-lists-empty-message">
                          You don't have any Crunchylists yet. Let's create one!
                        </p>
                        <button 
                          type="button" 
                          className="my-lists-empty-action-btn"
                          onClick={handleCreateCrunchylist}
                        >
                          CREATE NEW LIST
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
                          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Select a list folder below to view its comics collection or manage items.</p>
                          <button 
                            type="button" 
                            className="logout-header-btn"
                            style={{ margin: 0 }}
                            onClick={handleCreateCrunchylist}
                          >
                            + Create New List
                          </button>
                        </div>
                        <div className="crunchylists-grid">
                          {crunchylists.map(list => (
                            <div key={list.id} className="crunchylist-card">
                              <div className="crunchylist-card-header">
                                <span className="crunchylist-folder-icon">📂</span>
                                <h3 className="crunchylist-card-title" title={list.name}>{list.name}</h3>
                              </div>
                              <p className="crunchylist-card-count">{list.comics.length} comics inside</p>
                              <div className="crunchylist-card-actions">
                                <button 
                                  type="button" 
                                  className="crunchylist-btn-manage"
                                  onClick={() => setSelectedCrunchylistId(list.id)}
                                >
                                  Open List
                                </button>
                                <button 
                                  type="button" 
                                  className="crunchylist-btn-delete"
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete "${list.name}"?`)) {
                                      setCrunchylists(prev => prev.filter(l => l.id !== list.id));
                                      showToast(`Deleted Crunchylist "${list.name}"`, 'info');
                                    }
                                  }}
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}

                  {/* History Subtab Content */}
                  {librarySubTab === 'history' && (
                    filteredComics.length === 0 ? (
                      <div className="my-lists-empty-box">
                        <div className="my-lists-empty-svg">
                          <svg viewBox="0 0 200 200" width="160" height="160">
                            <rect x="50" y="70" width="100" height="60" rx="4" fill="#3f3f46" stroke="#27272a" strokeWidth="3" />
                            <rect x="56" y="76" width="88" height="48" rx="2" fill="#ff3333" opacity="0.15" />
                            <polygon points="35,130 165,130 155,145 45,145" fill="#52525b" />
                            <rect x="90" y="138" width="20" height="5" rx="1" fill="#27272a" />
                            <circle cx="100" cy="50" r="24" fill="none" stroke="#ff3333" strokeWidth="4" />
                            <line x1="100" y1="50" x2="100" y2="38" stroke="#ff3333" strokeWidth="3" strokeLinecap="round" />
                            <line x1="100" y1="50" x2="112" y2="50" stroke="#ff3333" strokeWidth="3" strokeLinecap="round" />
                            <path d="M150,80 L165,80 L165,95" fill="none" stroke="#9d4edd" strokeWidth="3" strokeLinecap="round" />
                            <circle cx="160" cy="115" r="4" fill="#ff477e" />
                            <circle cx="40" cy="85" r="5" fill="#facc15" />
                          </svg>
                        </div>
                        <p className="my-lists-empty-message">
                          Make History... with history. Start reading to fill this feed.
                        </p>
                        <button 
                          type="button" 
                          className="my-lists-empty-action-btn"
                          onClick={() => { setActiveTab('store'); setCurrentCategory('All'); setSearchQuery(''); }}
                        >
                          GO TO HOME FEED
                        </button>
                      </div>
                    ) : (
                      <div className="comics-grid">
                        {filteredComics.map(comic => (
                          <ComicCard 
                            key={comic.id} 
                            comic={comic} 
                            libraryEntry={library.find(item => item.id === comic.id)} 
                            liked={likedComics.includes(comic.id)}
                            likesCount={likesCount[comic.id] || 0}
                            onRead={() => setReaderComic(comic)} 
                            onDetails={() => setSelectedComic(comic)} 
                            onToggleBookmark={() => handleToggleBookmark(comic.id)} 
                            onToggleLike={() => handleToggleLike(comic.id)}
                          />
                        ))}
                      </div>
                    )
                  )}
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 className="comics-grid-title" style={{ margin: '0' }}>
                      {activeTab === 'liked' ? 'My Liked Books' : `${currentCategory} Catalog`}
                    </h2>
                    
                    {/* Reset Filters chip indicator if category or search query are active */}
                    {(currentCategory !== 'All' || searchQuery !== '') && (
                      <button 
                        type="button" 
                        className="logout-header-btn" 
                        onClick={() => { setCurrentCategory('All'); setSearchQuery(''); }}
                      >
                        Clear Filter (Show Discover Home)
                      </button>
                    )}
                  </div>

                  <div className="comics-grid">
                    {filteredComics.length === 0 ? (
                      <div className="glass-panel" style={{ gridColumn: '1/-1', padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <h3>No Comics Found</h3>
                        <p style={{ marginTop: '0.5rem' }}>
                          {activeTab === 'liked'
                            ? "You haven't liked any books yet. Open the catalog to like books!"
                            : "No comic matches your search parameters. Clear filters to return."}
                        </p>
                      </div>
                    ) : (
                      filteredComics.map(comic => {
                        const libEntry = library.find(item => item.id === comic.id);
                        const isLiked = likedComics.includes(comic.id);

                        return (
                          <ComicCard 
                            key={comic.id} 
                            comic={comic} 
                            libraryEntry={libEntry} 
                            liked={isLiked}
                            likesCount={likesCount[comic.id] || 0}
                            onRead={() => setReaderComic(comic)} 
                            onDetails={() => setSelectedComic(comic)} 
                            onToggleBookmark={() => handleToggleBookmark(comic.id)} 
                            onToggleLike={() => handleToggleLike(comic.id)}
                          />
                        );
                      })
                    )}
                  </div>
                </>
              )}

            </div>
          )}

        </main>
      </div>

      {/* Comic Detail Modal */}
      {selectedComic && (
        <ComicDetailsModal 
          comic={selectedComic} 
          libraryEntry={library.find(item => item.id === selectedComic.id)} 
          liked={likedComics.includes(selectedComic.id)}
          likesCount={likesCount[selectedComic.id] || 0}
          onClose={() => setSelectedComic(null)} 
          onRead={() => {
            setSelectedComic(null);
            setReaderComic(selectedComic);
          }} 
          onToggleBookmark={() => handleToggleBookmark(selectedComic.id)} 
          onToggleLike={() => handleToggleLike(selectedComic.id)}
        />
      )}

      {/* Crunchyroll-Style Immersive Comic Reader Overlay */}
      {readerComic && (
        <ComicReader 
          comic={readerComic} 
          comicsList={COMICS_DATABASE}
          initialPage={library.find(i => i.id === readerComic.id)?.progress || 1} 
          onClose={() => setReaderComic(null)} 
          onComicChange={(comicId) => {
            const nextComic = COMICS_DATABASE.find(c => c.id === comicId);
            if (nextComic) setReaderComic(nextComic);
          }}
          onProgressUpdate={(pageVal) => handleProgressUpdate(readerComic.id, pageVal)} 
        />
      )}

      {/* Crunchylist Manager Modal */}
      {activeCrunchylist && (
        <div className="modal-backdrop" style={{ zIndex: 120 }}>
          <div className="glass-panel" style={{ width: '450px', padding: '2rem', display: 'block', backgroundColor: 'var(--bg-surface-opaque)', border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff' }}>
              Manage "{activeCrunchylist.name}"
            </h3>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingRight: '0.5rem' }}>
              {COMICS_DATABASE.map(comic => {
                const isAdded = activeCrunchylist.comics.includes(comic.id);
                return (
                  <label 
                    key={comic.id} 
                    style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '0.6rem 0.8rem', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.03)', color: '#ffffff', userSelect: 'none' }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isAdded}
                      onChange={() => {
                        setCrunchylists(prev => prev.map(l => {
                          if (l.id === activeCrunchylist.id) {
                            const updatedComics = isAdded 
                              ? l.comics.filter(id => id !== comic.id)
                              : [...l.comics, comic.id];
                            
                            // Sync state of active list manager
                            setActiveCrunchylist(curr => ({ ...curr, comics: updatedComics }));
                            return { ...l, comics: updatedComics };
                          }
                          return l;
                        }));
                      }}
                      style={{ accentColor: '#ff3333', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{comic.title}</span>
                  </label>
                );
              })}
            </div>
            
            <button 
              type="button" 
              className="btn-hero-play" 
              style={{ width: '100%', margin: '0' }}
              onClick={() => {
                setActiveCrunchylist(null);
                showToast('Crunchylist updated successfully!', 'success');
              }}
            >
              Close & Save
            </button>
          </div>
        </div>
      )}

      {/* App Footer */}
      <footer className="discover-footer">
        <div className="discover-footer-content">
          <div className="discover-footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="brand-logo-burst" style={{ width: '30px', height: '30px', borderWidth: '1.8px', boxShadow: '1.5px 1.5px 0 #000000' }}>
              <span className="lightning-bolt-icon" style={{ fontSize: '1rem', WebkitTextStroke: '0.8px #000000' }}>⚡</span>
            </div>
            <span className="brand-name" style={{ fontSize: '1.4rem' }}>
              <span>Comic</span><span>Company</span>
            </span>
          </div>
          <p className="discover-footer-credits">
            Developed and designed by <strong>ksrp</strong>
          </p>
          <p className="discover-footer-copyright">
            Copyrights @2024 Comic Company. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast notifications list */}
      <div className="toast-container" aria-live="polite">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.type === 'success' ? '✅' : 'ℹ️'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
