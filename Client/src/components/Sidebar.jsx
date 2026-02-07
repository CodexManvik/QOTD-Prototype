import './Sidebar.css';

export default function Sidebar() {
  const questionProgress = {
    status: 'Not Attempted',
    attempts: 0,
    bestTime: '--',
    lastAttempt: '--',
  };

  const topSolvers = [
    { rank: 1, name: 'Sarah Dev', time: '2m 15s', initials: 'SD' },
    { rank: 2, name: 'Mike Code', time: '3m 42s', initials: 'MC' },
    { rank: 3, name: 'Jessica L.', time: '4m 18s', initials: 'JL' },
    { rank: 4, name: 'Tom Smith', time: '5m 33s', initials: 'TS' },
    { rank: 5, name: 'Alex Chen', time: '6m 12s', initials: 'AC' },
  ];

  return (
    <aside className="sidebar">
      <div className="progress-card">
        <h3 className="card-title">Your Progress</h3>
        <p className="card-subtitle">For this question</p>
        <div className="progress-grid">
          <div className="progress-item">
            <div className="progress-value">{questionProgress.status}</div>
            <div className="progress-label">Status</div>
          </div>
          <div className="progress-item">
            <div className="progress-value">{questionProgress.attempts}</div>
            <div className="progress-label">Attempts</div>
          </div>
          <div className="progress-item">
            <div className="progress-value">{questionProgress.bestTime}</div>
            <div className="progress-label">Best Time</div>
          </div>
          <div className="progress-item">
            <div className="progress-value">{questionProgress.lastAttempt}</div>
            <div className="progress-label">Last Attempt</div>
          </div>
        </div>
      </div>

      <div className="leaderboard-card">
        <h3 className="card-title">Top Solvers</h3>
        <p className="card-subtitle">Fastest for this question</p>
        <div className="leaderboard-list">
          {topSolvers.map((solver) => (
            <div key={solver.rank} className="leaderboard-item">
              <div className="rank-badge">{solver.rank}</div>
              <div className="solver-info">
                <div className="solver-avatar">{solver.initials}</div>
                <div className="solver-details">
                  <div className="solver-name">{solver.name}</div>
                </div>
              </div>
              <div className="solver-time">{solver.time}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
