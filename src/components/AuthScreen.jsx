import React, { useState, useEffect, useRef } from 'react';

export default function AuthScreen({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const canvasRef = useRef(null);

  // 3D Starfield Warp Tunnel Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set sizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle params
    const numStars = 220;
    const stars = [];
    const maxDepth = 1000;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: Math.random() * maxDepth,
        color: ['#ff3333', '#9d4edd', '#ff477e', '#ffffff'][Math.floor(Math.random() * 4)]
      });
    }

    // Mouse tracking for 3D parallax offsets
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.15;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Semi-transparent clearing creates trailing glow effect
      ctx.fillStyle = 'rgba(2, 4, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2 + mouseX;
      const cy = canvas.height / 2 + mouseY;

      stars.forEach(star => {
        // move forward (Z gets smaller)
        star.z -= 6;
        if (star.z <= 0) {
          star.z = maxDepth;
          star.x = (Math.random() - 0.5) * 1000;
          star.y = (Math.random() - 0.5) * 1000;
        }

        // 3D perspective projection
        const k = 400 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
          const size = (1 - star.z / maxDepth) * 5 + 0.5;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();

          // draw subtle streak line
          const prevK = 400 / (star.z + 15);
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(prevPx, prevPy);
          ctx.strokeStyle = star.color;
          ctx.lineWidth = size * 0.4;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email && password) {
        onLoginSuccess(email.split('@')[0]); // return username
      }
    } else {
      if (email && password && username) {
        onLoginSuccess(username);
      }
    }
  };

  return (
    <div className="auth-page">
      <canvas ref={canvasRef} className="auth-canvas" />
      
      <div className="auth-card-wrapper">
        <div className="auth-card glass-panel">
          <div className="auth-header">
            <span className="auth-logo" role="img" aria-label="sparks">⚡</span>
            <h2 className="auth-title">Comic Company</h2>
            <p className="auth-subtitle">
              {isLogin ? 'Log in to read Marvel, DC & Disney Comics' : 'Create your free account to get started'}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  className="form-control" 
                  placeholder="SuperReader" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-control" 
                placeholder="reader@comiccompany.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-control" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="checkout-btn" style={{ marginTop: '0.5rem' }}>
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-toggle-row">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              type="button" 
              className="auth-toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up Free' : 'Sign In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
