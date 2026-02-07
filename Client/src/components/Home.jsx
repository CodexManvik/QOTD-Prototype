import React from 'react';

export default function Home() {
  return (
    <div className="home">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;700&family=Sora:wght@400;600;700&display=swap');

        .home {
          --sky: #C9EDFD;
          --sky-deep: #9fdcff;
          --ink: #0b1f2a;
          --muted: #3a4a57;
          --card: rgba(255, 255, 255, 0.75);
          --line: rgba(11, 31, 42, 0.08);
          color: var(--ink);
          font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
          background:
            radial-gradient(900px 420px at 12% 0%, rgba(201, 237, 253, 0.8), transparent 60%),
            radial-gradient(700px 360px at 90% 10%, rgba(159, 220, 255, 0.7), transparent 55%),
            linear-gradient(180deg, #f7fbff 0%, #eff7fc 100%);
          min-height: 100vh;
        }

        .page {
          padding: 28px 6vw 80px;
        }

        .hero {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
          align-items: center;
          padding: 48px 0 24px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(201, 237, 253, 0.7);
          color: #0e2a37;
          font-weight: 600;
          font-size: 13px;
        }

        .hero h1 {
          font-family: 'Sora', 'Manrope', sans-serif;
          font-size: clamp(32px, 4.2vw, 54px);
          line-height: 1.05;
          margin: 16px 0 12px;
          letter-spacing: -0.5px;
        }

        .hero p {
          font-size: 17px;
          color: var(--muted);
          max-width: 560px;
        }

        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 22px;
        }

        .btn {
          border: none;
          text-decoration: none;
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
          box-shadow: 0 12px 30px rgba(11, 31, 42, 0.12);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-primary {
          background: var(--ink);
          color: #fff;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.8);
          color: var(--ink);
          border: 1px solid var(--line);
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(11, 31, 42, 0.16);
        }

        .hero-card {
          border-radius: 20px;
          background: var(--card);
          border: 1px solid rgba(255, 255, 255, 0.6);
          padding: 20px;
          box-shadow: 0 24px 50px rgba(11, 31, 42, 0.12);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
          animation: float 6s ease-in-out infinite;
        }

        .hero-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(200px 120px at 80% 10%, rgba(201, 237, 253, 0.9), transparent 65%);
          opacity: 0.7;
        }

        .hero-card-content {
          position: relative;
          z-index: 1;
        }

        .quote-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin: 0 0 12px;
          color: #1c4252;
        }

        .quote {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 16px;
        }

        .quote-author {
          font-size: 14px;
          color: var(--muted);
          margin: 0 0 18px;
        }

        .progress {
          display: grid;
          gap: 8px;
        }

        .progress span {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: var(--muted);
        }

        .bar {
          height: 8px;
          background: rgba(11, 31, 42, 0.08);
          border-radius: 999px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          width: 72%;
          background: linear-gradient(90deg, var(--sky), var(--sky-deep));
        }

        .pill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 16px;
        }

        .pill {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid var(--line);
          font-size: 13px;
        }

        .section {
          margin-top: 56px;
        }

        .section h2 {
          font-family: 'Sora', sans-serif;
          font-size: clamp(22px, 2.4vw, 32px);
          margin: 0 0 14px;
        }

        .section p {
          color: var(--muted);
          margin: 0 0 24px;
          max-width: 720px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .card {
          background: var(--card);
          border-radius: 18px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 14px 30px rgba(11, 31, 42, 0.08);
        }

        .card h3 {
          margin: 0 0 8px;
          font-size: 17px;
        }

        .card p {
          margin: 0;
          font-size: 14px;
          color: var(--muted);
        }

        .flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
        }

        .flow-step {
          background: rgba(255, 255, 255, 0.6);
          border-radius: 16px;
          padding: 16px;
          border: 1px solid var(--line);
        }

        .flow-step strong {
          display: block;
          margin-bottom: 8px;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }

        .stat {
          border-radius: 16px;
          background: rgba(201, 237, 253, 0.4);
          padding: 16px;
          text-align: center;
          border: 1px solid rgba(11, 31, 42, 0.06);
        }

        .stat strong {
          display: block;
          font-size: 22px;
        }

        .cta {
          margin-top: 64px;
          border-radius: 24px;
          padding: 28px;
          background: linear-gradient(120deg, rgba(201, 237, 253, 0.8), rgba(255, 255, 255, 0.9));
          border: 1px solid rgba(255, 255, 255, 0.7);
          display: grid;
          gap: 12px;
          align-items: center;
          justify-items: start;
        }

        .footer {
          margin-top: 42px;
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: space-between;
          color: var(--muted);
          font-size: 14px;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @media (max-width: 720px) {
          .page {
            padding: 24px 5vw 64px;
          }

          .cta {
            justify-items: stretch;
          }
        }
      `}</style>

      <main className="page" aria-labelledby="home-hero">
        <section className="hero">
          <div>
            <span className="eyebrow">Quote of the Day - Focused learning</span>
            <h1 id="home-hero">Start each day with a quote, end it with a win.</h1>
            <p>
              QOTD delivers a daily prompt, a short challenge, and a reflection space so learners build skills in minutes,
              not hours. Simple, consistent, and motivating.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="/start">Start today</a>
              <a className="btn btn-secondary" href="/explore">Preview the flow</a>
            </div>
            <div className="pill-row" aria-label="Highlights">
              <span className="pill">5-minute daily rituals</span>
              <span className="pill">Community streaks</span>
              <span className="pill">Actionable feedback</span>
            </div>
          </div>

          <div className="hero-card" aria-hidden>
            <div className="hero-card-content">
              <p className="quote-title">Today's Quote</p>
              <p className="quote">"Small steps compound into big change."</p>
              <p className="quote-author">- QOTD Practice Lab</p>
              <div className="progress">
                <span>
                  Streak progress
                  <strong>18 / 25</strong>
                </span>
                <div className="bar">
                  <div className="bar-fill" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Why QOTD">
          <h2>Designed to feel light, build deep.</h2>
          <p>
            Each day blends a meaningful quote with a micro-challenge and reflection prompt. The flow is built for
            momentum, so learners stay consistent without burnout.
          </p>
          <div className="grid">
            <div className="card">
              <h3>Daily learning loop</h3>
              <p>Quote, challenge, reflect, and share in under 10 minutes.</p>
            </div>
            <div className="card">
              <h3>Gentle accountability</h3>
              <p>Streaks, reminders, and check-ins that never feel noisy.</p>
            </div>
            <div className="card">
              <h3>Feedback-ready</h3>
              <p>Capture insights and track growth with daily notes.</p>
            </div>
            <div className="card">
              <h3>Community energy</h3>
              <p>See how others interpret the same quote to spark ideas.</p>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Daily flow">
          <h2>Your 3-step daily flow</h2>
          <p>Make the habit stick with a consistent rhythm that fits in any schedule.</p>
          <div className="flow">
            <div className="flow-step">
              <strong>Read the quote</strong>
              <span>Short, inspiring, and themed to your goals.</span>
            </div>
            <div className="flow-step">
              <strong>Solve the challenge</strong>
              <span>One focused action: write, build, or discuss.</span>
            </div>
            <div className="flow-step">
              <strong>Reflect + save</strong>
              <span>Capture the insight and track the streak.</span>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Impact stats">
          <h2>Momentum by the numbers</h2>
          <p>We keep QOTD lightweight so the impact keeps compounding.</p>
          <div className="stats">
            <div className="stat">
              <strong>9.2k+</strong>
              <span>daily check-ins</span>
            </div>
            <div className="stat">
              <strong>4.7x</strong>
              <span>average streak growth</span>
            </div>
            <div className="stat">
              <strong>86%</strong>
              <span>return rate week-over-week</span>
            </div>
          </div>
        </section>

        <section className="cta" aria-label="Call to action">
          <h2>Build a daily learning ritual with QOTD.</h2>
          <p>Start with the next quote and keep the streak alive with your community.</p>
          <a className="btn btn-primary" href="/start">Join the daily challenge</a>
        </section>

        <footer className="footer">
          <span>QOTD Prototype - Crafted for consistent growth</span>
          <span>Need a custom journey? We can add one.</span>
        </footer>
      </main>
    </div>
  );
}
