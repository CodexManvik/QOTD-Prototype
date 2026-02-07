import './DailyCTA.css';

export default function DailyCTA() {
  return (
    <div className="daily-cta">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">Keep Your Streak Alive! 🔥</h2>
          <p className="cta-subtitle">
            Come back tomorrow to solve another challenge and build your consistent learning habit.
          </p>
        </div>
        <button className="cta-button">View Tomorrow&apos;s Challenge</button>
      </div>
    </div>
  );
}
