import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">Quote of the Day - Focused learning</span>
          <h1>Start each day with a quote, end it with a win.</h1>
          <p>
            QOTD delivers a daily prompt, a short challenge, and a reflection space so learners build skills in minutes,
            not hours. Simple, consistent, and motivating.
          </p>
          <div className="cta-row">
            <Link to="/qotd" className="btn btn-primary">Start today</Link>
            <Link to="/leaderboard" className="btn btn-secondary">View Leaderboard</Link>
          </div>
          <div className="pill-row">
            <span className="pill">5-minute daily rituals</span>
            <span className="pill">Community streaks</span>
            <span className="pill">Actionable feedback</span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-content">
            <p className="quote-title">Today's Quote</p>
            <p className="quote">"Small steps compound into big change."</p>
            <p className="quote-author">- QOTD Practice Lab</p>
            <div className="progress-bar-section">
              <span className="progress-text">
                Streak progress
                <strong>18 / 25</strong>
              </span>
              <div className="bar">
                <div className="bar-fill" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Designed to feel light, build deep.</h2>
        <p>
          Each day blends a meaningful quote with a micro-challenge and reflection prompt. The flow is built for
          momentum, so learners stay consistent without burnout.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Daily learning loop</h3>
            <p>Quote, challenge, reflect, and share in under 10 minutes.</p>
          </div>
          <div className="feature-card">
            <h3>Gentle accountability</h3>
            <p>Streaks, reminders, and check-ins that never feel noisy.</p>
          </div>
          <div className="feature-card">
            <h3>Feedback-ready</h3>
            <p>Capture insights and track growth with daily notes.</p>
          </div>
          <div className="feature-card">
            <h3>Community energy</h3>
            <p>See how others interpret the same quote to spark ideas.</p>
          </div>
        </div>
      </section>

      <section className="flow-section">
        <h2>Your 3-step daily flow</h2>
        <p>Make the habit stick with a consistent rhythm that fits in any schedule.</p>
        <div className="flow-grid">
          <div className="flow-step">
            <span className="step-number">1</span>
            <strong>Read the quote</strong>
            <span>Short, inspiring, and themed to your goals.</span>
          </div>
          <div className="flow-step">
            <span className="step-number">2</span>
            <strong>Solve the challenge</strong>
            <span>One focused action: write, build, or discuss.</span>
          </div>
          <div className="flow-step">
            <span className="step-number">3</span>
            <strong>Reflect + save</strong>
            <span>Capture the insight and track the streak.</span>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h2>Momentum by the numbers</h2>
        <p>We keep QOTD lightweight so the impact keeps compounding.</p>
        <div className="stats-grid">
          <div className="stat-card">
            <strong>9.2k+</strong>
            <span>daily check-ins</span>
          </div>
          <div className="stat-card">
            <strong>4.7x</strong>
            <span>average streak growth</span>
          </div>
          <div className="stat-card">
            <strong>86%</strong>
            <span>return rate week-over-week</span>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <h2>Build a daily learning ritual with QOTD.</h2>
        <p>Start with the next quote and keep the streak alive with your community.</p>
        <Link to="/qotd" className="btn btn-primary">Join the daily challenge</Link>
      </section>

      <footer className="home-footer">
        <span>QOTD Prototype - Crafted for consistent growth</span>
        <span>Need a custom journey? We can add one.</span>
      </footer>
    </main>
  );
}
