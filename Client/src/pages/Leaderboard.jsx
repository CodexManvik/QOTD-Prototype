import { useState } from 'react';
import { Trophy, Medal, Crown, ChevronUp, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import './Leaderboard.css';

export default function Leaderboard() {
    const [filter, setFilter] = useState('all');

    const leaderboardData = [
        { rank: 1, name: 'Alex Thompson', score: 2850, solved: 156, streak: 45, change: 'up' },
        { rank: 2, name: 'Sarah Chen', score: 2720, solved: 142, streak: 38, change: 'up' },
        { rank: 3, name: 'Michael Park', score: 2680, solved: 138, streak: 32, change: 'down' },
        { rank: 4, name: 'Emma Wilson', score: 2540, solved: 128, streak: 28, change: 'same' },
        { rank: 5, name: 'James Rodriguez', score: 2490, solved: 125, streak: 24, change: 'up' },
        { rank: 6, name: 'Lisa Wang', score: 2350, solved: 118, streak: 21, change: 'down' },
        { rank: 7, name: 'David Kim', score: 2280, solved: 112, streak: 18, change: 'up' },
        { rank: 8, name: 'Nina Patel', score: 2150, solved: 105, streak: 15, change: 'same' },
        { rank: 9, name: 'Chris Anderson', score: 2080, solved: 98, streak: 12, change: 'down' },
        { rank: 10, name: 'Maria Garcia', score: 1950, solved: 92, streak: 10, change: 'up' },
    ];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="rank-icon gold" />;
        if (rank === 2) return <Medal className="rank-icon silver" />;
        if (rank === 3) return <Medal className="rank-icon bronze" />;
        return <span className="rank-number">{rank}</span>;
    };

    const getChangeIcon = (change) => {
        if (change === 'up') return <ChevronUp className="change-icon up" />;
        if (change === 'down') return <ChevronDown className="change-icon down" />;
        return <span className="change-icon same">-</span>;
    };

    return (
        <div className="app">
            
            <main className="leaderboard-page">
                <div className="leaderboard-container">
                    <header className="leaderboard-header">
                        <div className="header-text">
                            <h1><Trophy size={32} /> Global Leaderboard</h1>
                            <p>See how you stack up against the best coders</p>
                        </div>
                        <div className="filter-tabs">
                            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All Time</button>
                            <button className={filter === 'month' ? 'active' : ''} onClick={() => setFilter('month')}>This Month</button>
                            <button className={filter === 'week' ? 'active' : ''} onClick={() => setFilter('week')}>This Week</button>
                        </div>
                    </header>

                    <div className="top-three">
                        {leaderboardData.slice(0, 3).map((user, index) => (
                            <div key={user.rank} className={`podium-card rank-${user.rank}`}>
                                <div className="podium-rank">{getRankIcon(user.rank)}</div>
                                <div className="podium-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                                <div className="podium-name">{user.name}</div>
                                <div className="podium-score">{user.score.toLocaleString()} pts</div>
                                <div className="podium-stats">
                                    <span>{user.solved} solved</span>
                                    <span>🔥 {user.streak} days</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="leaderboard-table">
                        <div className="table-header">
                            <span className="col-rank">Rank</span>
                            <span className="col-user">User</span>
                            <span className="col-score">Score</span>
                            <span className="col-solved">Solved</span>
                            <span className="col-streak">Streak</span>
                            <span className="col-change">Change</span>
                        </div>
                        <div className="table-body">
                            {leaderboardData.slice(3).map(user => (
                                <div key={user.rank} className="table-row">
                                    <span className="col-rank">{user.rank}</span>
                                    <span className="col-user">
                                        <div className="user-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
                                        <span className="user-name">{user.name}</span>
                                    </span>
                                    <span className="col-score">{user.score.toLocaleString()}</span>
                                    <span className="col-solved">{user.solved}</span>
                                    <span className="col-streak">🔥 {user.streak}</span>
                                    <span className="col-change">{getChangeIcon(user.change)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="your-rank-card">
                        <span className="your-rank-label">Your Position</span>
                        <span className="your-rank-value">#156</span>
                        <span className="your-rank-score">1,245 pts</span>
                        <button className="improve-btn">Keep Practicing →</button>
                    </div>
                </div>
            </main>
        </div>
    );
}
