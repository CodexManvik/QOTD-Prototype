import { useState } from 'react';
<<<<<<< HEAD
import { Trophy, Medal, Crown, ChevronUp, ChevronDown } from 'lucide-react';
=======
import { 
    Trophy, 
    Crown, 
    Medal, 
    TrendingUp, 
    TrendingDown, 
    Minus, 
    Zap, 
    Target 
} from 'lucide-react';
>>>>>>> b24bfbe4ad4c6179ab113a0f3cdbf3203e843238
import './Leaderboard.css';

export default function Leaderboard() {
    const [filter, setFilter] = useState('alltime');

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

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="rank-icon gold" />;
        if (rank === 2) return <Medal className="rank-icon silver" />;
        if (rank === 3) return <Medal className="rank-icon bronze" />;
        return null;
    };

    return (
<<<<<<< HEAD
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
=======
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                
                {/* Header */}
                <div className="leaderboard-header">
                    <div className="header-text">
                        <h1>
                            <Trophy />
                            Leaderboard
                        </h1>
                        <p>Compete with developers worldwide</p>
                    </div>
                    <div className="filter-tabs">
                        {[
                            { key: 'alltime', label: 'All Time' },
                            { key: 'thismonth', label: 'This Month' },
                            { key: 'thisweek', label: 'This Week' }
                        ].map((tab) => (
                            <button 
                                key={tab.key}
                                className={filter === tab.key ? 'active' : ''}
                                onClick={() => setFilter(tab.key)}
                            >
                                {tab.label}
                            </button>
>>>>>>> b24bfbe4ad4c6179ab113a0f3cdbf3203e843238
                        ))}
                    </div>
                </div>
<<<<<<< HEAD
            </main>
=======

                {/* Top 3 Podium */}
                <div className="top-three">
                    {leaderboardData.slice(0, 3).map((user) => (
                        <div key={user.rank} className={`podium-card rank-${user.rank}`}>
                            <div className="podium-rank">
                                {getRankIcon(user.rank)}
                            </div>
                            <div className="podium-avatar">
                                {getInitials(user.name)}
                            </div>
                            <div className="podium-name">{user.name}</div>
                            <div className="podium-score">{user.score.toLocaleString()} pts</div>
                            <div className="podium-stats">
                                <span><Target size={12} /> {user.solved} solved</span>
                                <span>•</span>
                                <span><Zap size={12} /> {user.streak} day streak</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leaderboard Table */}
                <div className="leaderboard-table">
                    <div className="table-header">
                        <span>Rank</span>
                        <span>User</span>
                        <span>Score</span>
                        <span>Solved</span>
                        <span>Streak</span>
                        <span>Trend</span>
                    </div>
                    
                    {leaderboardData.slice(3).map((user) => (
                        <div key={user.rank} className="table-row">
                            <div className="col-rank">#{user.rank}</div>
                            <div className="col-user">
                                <div className="user-avatar">{getInitials(user.name)}</div>
                                <span className="user-name">{user.name}</span>
                            </div>
                            <div className="col-score">{user.score.toLocaleString()}</div>
                            <div className="col-solved">{user.solved}</div>
                            <div className="col-streak">{user.streak} days</div>
                            <div className={`change-icon ${user.change}`}>
                                {user.change === 'up' && <TrendingUp size={18} />}
                                {user.change === 'down' && <TrendingDown size={18} />}
                                {user.change === 'same' && <Minus size={18} />}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Your Rank Card */}
                <div className="your-rank-card">
                    <div className="your-rank-info">
                        <div className="your-rank-label">Your Rank</div>
                        <div className="your-rank-value">#156</div>
                        <div className="your-rank-score">1,245 points</div>
                    </div>
                    <button className="improve-btn">
                        <Target size={18} />
                        Keep Practicing
                    </button>
                </div>

            </div>
        </div>
>>>>>>> b24bfbe4ad4c6179ab113a0f3cdbf3203e843238
    );
}
