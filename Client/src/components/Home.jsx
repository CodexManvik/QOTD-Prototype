import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import lottie from 'lottie-web';
import './Home.css';

// --- Helper Component for Lottie ---
const LottiePlayer = ({ filename, style, className }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: `/${filename}`, 
    });
    return () => anim.destroy();
  }, [filename]);

  return <div ref={container} style={style} className={className} />;
};

export default function Home() {
  const [isLeaderboardActive, setIsLeaderboardActive] = useState(false);

  return (
    <main className="dashboard-container">
      <div className="dashboard-grid">
        
        {/* AREA 1: Main Hero */}
        <div className="grid-cell hero-cell">
          <div className="hero-split">
            <div className="hero-text">
              <div className="tag-row">
                <span className="status-tag">Live v2.0</span>
                <span className="status-tag-outline">Quote of the Day</span>
              </div>
              <h1>Start with a quote,<br/>end with a win.</h1>
              <p>
                QOTD delivers a daily prompt, a short challenge, and a reflection space. 
                Build skills in minutes.
              </p>
              <div className="cta-group">
                <Link to="/qotd" className="btn btn-primary">Start today</Link>
                <div className="meta-text">
                  <span className="dot"></span> 9.2k+ learners
                </div>
              </div>
            </div>

            <div className="hero-visual">
               <LottiePlayer 
                 filename="growth-analysis.json" 
                 style={{ width: '100%', maxWidth: '280px', height: 'auto' }} 
               />
            </div>
          </div>
        </div>

        {/* AREA 2: The App Preview */}
        <div className="grid-cell visual-cell">
          <div className="visual-backdrop"></div>
          
          <div className="phone-card">
            <div className="phone-top">
              <span className="app-name">QOTD</span>
              <span className="streak-indicator">18 Day Streak</span>
            </div>
            
            <div className="phone-screen">
              <div className="screen-header-anim">
                <LottiePlayer 
                  filename="market-research.json" 
                  style={{ width: '20vw', height: '20vw' }} 
                />
              </div>

              <div className="quote-clean">
                <span className="label-tiny">DAILY QUOTE</span>
                <h4>"Small steps compound into big change."</h4>
              </div>

              <div className="action-clean">
                 <div className="input-stub">Write reflection...</div>
              </div>
            </div>
          </div>
        </div>

        {/* AREA 3: Stats */}
        <div className="grid-cell stat-cell">
          <div className="stat-item">
            <span className="stat-val">4.7x</span>
            <span className="stat-label">Growth</span>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <span className="stat-val">86%</span>
            <span className="stat-label">Retention</span>
          </div>
          <div className="divider"></div>
          <div className="stat-item">
            <span className="stat-val">Daily</span>
            <span className="stat-label">Loop</span>
          </div>
        </div>

        {/* AREA 4: Leaderboard Card */}
        <div 
          className={`grid-cell henry-card ${isLeaderboardActive ? 'active' : ''}`}
          onClick={() => setIsLeaderboardActive(!isLeaderboardActive)}
        >
           {/* State A: Inactive (Big JSON Layout) */}
           <div className={`henry-content inactive-view ${isLeaderboardActive ? 'hidden' : ''}`}>
              <div className="henry-text-top">
                  <h3>LEADERBOARD</h3>
                  <p>View top learners</p>
              </div>
              
              <div className="henry-big-icon">
                 <LottiePlayer 
                    filename="blockchain-technology.json"
                    style={{ width: '18vw', height: 'vw' }} 
                 />
              </div>
           </div>

           {/* State B: Active (The List) */}
           <div className={`henry-content active-view ${!isLeaderboardActive ? 'hidden' : ''}`}>
               <div className="henry-header">
                  
                   <h3>TOP LEARNERS</h3>
               </div>
               <div className="henry-list">
                   <div className="h-row"><span>01</span> Alex M. <span className="pts">1240</span></div>
                   <div className="h-row"><span>02</span> Sarah K. <span className="pts">1180</span></div>
                   <div className="h-row"><span>03</span> Jinhai <span className="pts">1050</span></div>
               </div>
           </div>
        </div>

      </div>
    </main>
  );
}