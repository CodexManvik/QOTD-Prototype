import { useEffect, useState } from 'react';
import SplitText from './SplitText';
import QOTDTimer from './Timer';
import './PageHeader.css';

export default function PageHeader() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    if (showIntro) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [showIntro]);

  const handleSkip = () => setShowIntro(false);

  return (
    <>
      <div
        className={`intro-overlay ${showIntro ? 'active' : 'hidden'}`}
        onClick={handleSkip}
        role="dialog"
        aria-hidden={!showIntro}
      >
        <SplitText
          text="Hello, Coder!"
          className="intro-split"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          textAlign="center"
          onLetterAnimationComplete={() => setShowIntro(false)}
        />
      </div>

      <div className="page-header" aria-hidden={showIntro}>
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
