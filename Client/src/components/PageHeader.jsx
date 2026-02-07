import { useEffect, useState } from 'react';
import SplitText from './SplitText';
import QOTDTimer from './Timer';
import './PageHeader.css';

export default function PageHeader() {
  const [introState, setIntroState] = useState('active'); // 'active', 'exiting', 'hidden'

  useEffect(() => {
    // Lock scroll during intro
    document.body.style.overflow = 'hidden';

    // 1. Start exit animation after 2.5s
    const exitTimer = setTimeout(() => {
      setIntroState('exiting');
    }, 2500);

    // 2. Remove from DOM after animation finishes
    const cleanupTimer = setTimeout(() => {
      setIntroState('hidden');
      document.body.style.overflow = '';
    }, 3500); // 2500ms wait + 1000ms animation

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* --- Premium Curtain Overlay --- */}
      {introState !== 'hidden' && (
        <div className={`curtain-overlay ${introState}`}>
          <div className="curtain-content">
            <div className="logo-badge">
              <img 
                src="/logo.png" 
                alt="TechLearn Logo" 
                className="curtain-logo"
              />
            </div>
            <h1 className="brand-text">
              <span className="text-line line-1">TechLearn</span>
              <span className="text-line line-2">Solutions</span>
            </h1>
            <div className="loading-bar">
              <div className="loading-fill"></div>
            </div>
          </div>
        </div>
      )}

      {/* --- Page Header --- */}
      <div className="page-header">
        <div className="header-content">
          <SplitText
            text="Question of the Day"
            className="page-title split-text-title"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            textAlign="left"
          />
          <p className="page-subtitle">Solve daily challenges to build your streak</p>
        </div>
        <QOTDTimer />
      </div>
    </>
  );
}
