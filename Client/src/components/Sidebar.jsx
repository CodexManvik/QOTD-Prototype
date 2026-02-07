import './Sidebar.css';

export default function Sidebar() {
  const stats = {
    attempts: 42,
    successRate: 85,
    averageTime: '12m 45s',
    streak: 5,
  };

  const leaderboard = [
    { rank: 1, name: 'Sarah Dev', score: 580, initials: 'SD' },
    { rank: 2, name: 'Mike Code', score: 545, initials: 'MC' },
    { rank: 3, name: 'Jessica L.', score: 490, initials: 'JL' },
    { rank: 4, name: 'Tom Smith', score: 450, initials: 'TS' },
    { rank: 5, name: 'Alex Chen', score: 420, initials: 'AC' },
  ];

  return (
    <aside className="sidebar">
      <div className="progress-card">
        <h3 className="card-title">Your Progress</h3>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-value">{stats.attempts}</div>
            <div className="progress-label">Attempts</div>
          </div>
          <div className="progress-item">
            <div className="progress-value">{stats.successRate}%</div>
            <div className="progress-label">Success Rate</div>
          </div>
          <div className="progress-item">
            <div className="progress-value">{stats.averageTime}</div>
            <div className="progress-label">Avg. Time</div>
          </div>
          <div className="progress-item">
            <div className="progress-value streak">{stats.streak}🔥</div>
            <div className="progress-label">Streak</div>
          </div>
        </div>
      </div>

      <div className="leaderboard-card">
        <h3 className="card-title">Top Solvers Today</h3>
        <div className="leaderboard-list">
          {leaderboard.map((solver) => (
            <div key={solver.rank} className="leaderboard-item">
              <div className="rank-badge">{solver.rank}</div>
              <div className="solver-info">
                <div className="solver-avatar">{solver.initials}</div>
                <div className="solver-details">
                  <div className="solver-name">{solver.name}</div>
                </div>
              </div>
              <div className="solver-score">{solver.score}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
