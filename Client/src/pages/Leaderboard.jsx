import { useState, useEffect } from 'react';
import {
    Trophy,
    Crown,
    Medal,
    Award,
    TrendingUp,
    TrendingDown,
    Minus,
    Zap,
    Target
} from 'lucide-react';
import './Leaderboard.css';

// API base URL - change this for production
const API_BASE = 'http://localhost:3000/api';

export default function Leaderboard() {
    const [filter, setFilter] = useState('all');
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Mock data fallback when API is not available
    const mockData = {
        all: [
            { rank: 1, name: 'Alex Thompson', score: 2850, easy: 56, medium: 72, hard: 28, streak: 45, change: 'up' },
            { rank: 2, name: 'Sarah Chen', score: 2720, easy: 48, medium: 65, hard: 29, streak: 38, change: 'up' },
            { rank: 3, name: 'Michael Park', score: 2680, easy: 52, medium: 60, hard: 26, streak: 32, change: 'down' },
            { rank: 4, name: 'Emma Wilson', score: 2540, easy: 45, medium: 58, hard: 25, streak: 28, change: 'same' },
            { rank: 5, name: 'James Rodriguez', score: 2490, easy: 50, medium: 55, hard: 20, streak: 24, change: 'up' },
            { rank: 6, name: 'Lisa Wang', score: 2350, easy: 42, medium: 52, hard: 24, streak: 21, change: 'down' },
            { rank: 7, name: 'David Kim', score: 2280, easy: 48, medium: 45, hard: 19, streak: 18, change: 'up' },
            { rank: 8, name: 'Nina Patel', score: 2150, easy: 40, medium: 48, hard: 17, streak: 15, change: 'same' },
            { rank: 9, name: 'Chris Anderson', score: 2080, easy: 38, medium: 42, hard: 18, streak: 12, change: 'down' },
            { rank: 10, name: 'Maria Garcia', score: 1950, easy: 35, medium: 40, hard: 17, streak: 10, change: 'up' },
        ],
        easy: [
            { rank: 1, name: 'Alex Thompson', score: 560, solved: 56, streak: 45, change: 'up' },
            { rank: 2, name: 'Michael Park', score: 520, solved: 52, streak: 32, change: 'up' },
            { rank: 3, name: 'James Rodriguez', score: 500, solved: 50, streak: 24, change: 'same' },
            { rank: 4, name: 'Sarah Chen', score: 480, solved: 48, streak: 38, change: 'down' },
            { rank: 5, name: 'David Kim', score: 480, solved: 48, streak: 18, change: 'up' },
            { rank: 6, name: 'Emma Wilson', score: 450, solved: 45, streak: 28, change: 'same' },
            { rank: 7, name: 'Lisa Wang', score: 420, solved: 42, streak: 21, change: 'down' },
            { rank: 8, name: 'Nina Patel', score: 400, solved: 40, streak: 15, change: 'up' },
            { rank: 9, name: 'Chris Anderson', score: 380, solved: 38, streak: 12, change: 'down' },
            { rank: 10, name: 'Maria Garcia', score: 350, solved: 35, streak: 10, change: 'same' },
        ],
        medium: [
            { rank: 1, name: 'Alex Thompson', score: 1440, solved: 72, streak: 45, change: 'up' },
            { rank: 2, name: 'Sarah Chen', score: 1300, solved: 65, streak: 38, change: 'up' },
            { rank: 3, name: 'Michael Park', score: 1200, solved: 60, streak: 32, change: 'same' },
            { rank: 4, name: 'Emma Wilson', score: 1160, solved: 58, streak: 28, change: 'down' },
            { rank: 5, name: 'James Rodriguez', score: 1100, solved: 55, streak: 24, change: 'up' },
            { rank: 6, name: 'Lisa Wang', score: 1040, solved: 52, streak: 21, change: 'down' },
            { rank: 7, name: 'Nina Patel', score: 960, solved: 48, streak: 15, change: 'up' },
            { rank: 8, name: 'David Kim', score: 900, solved: 45, streak: 18, change: 'same' },
            { rank: 9, name: 'Chris Anderson', score: 840, solved: 42, streak: 12, change: 'down' },
            { rank: 10, name: 'Maria Garcia', score: 800, solved: 40, streak: 10, change: 'up' },
        ],
        hard: [
            { rank: 1, name: 'Sarah Chen', score: 870, solved: 29, streak: 38, change: 'up' },
            { rank: 2, name: 'Alex Thompson', score: 840, solved: 28, streak: 45, change: 'down' },
            { rank: 3, name: 'Michael Park', score: 780, solved: 26, streak: 32, change: 'up' },
            { rank: 4, name: 'Emma Wilson', score: 750, solved: 25, streak: 28, change: 'same' },
            { rank: 5, name: 'Lisa Wang', score: 720, solved: 24, streak: 21, change: 'up' },
            { rank: 6, name: 'James Rodriguez', score: 600, solved: 20, streak: 24, change: 'down' },
            { rank: 7, name: 'David Kim', score: 570, solved: 19, streak: 18, change: 'same' },
            { rank: 8, name: 'Chris Anderson', score: 540, solved: 18, streak: 12, change: 'up' },
            { rank: 9, name: 'Nina Patel', score: 510, solved: 17, streak: 15, change: 'down' },
            { rank: 10, name: 'Maria Garcia', score: 510, solved: 17, streak: 10, change: 'same' },
        ],
    };

    // Fetch leaderboard data from API
    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            setError(null);

            try {
                // Map filter to API difficulty parameter
                const difficulty = filter === 'all' ? '' : filter;
                const url = difficulty
                    ? `${API_BASE}/leaderboard?difficulty=${difficulty}`
                    : `${API_BASE}/leaderboard`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }

                const data = await response.json();

                // Transform API response to match component data structure
                if (data && data.length > 0) {
                    const transformed = data.map((item, index) => ({
                        rank: index + 1,
                        name: item.username || item._id,
                        score: item.totalScore || 0,
                        solved: item.solvedCount || 1,
                        streak: item.streak || 0,
                        change: 'same' // API doesn't track this yet
                    }));
                    setLeaderboardData(transformed);
                } else {
                    // Fall back to mock data if API returns empty
                    setLeaderboardData(mockData[filter]);
                }
            } catch (err) {
                console.warn('Using mock data:', err.message);
                // Fall back to mock data on error
                setLeaderboardData(mockData[filter]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [filter]);

    const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="rank-icon gold" />;
        if (rank === 2) return <Award className="rank-icon silver" />;
        if (rank === 3) return <Medal className="rank-icon bronze" />;
        return null;
    };

    const getSolvedCount = (user) => {
        if (filter === 'all' && user.easy !== undefined) {
            return user.easy + user.medium + user.hard;
        }
        return user.solved || 0;
    };

    const getDifficultyLabel = () => {
        switch (filter) {
            case 'easy': return 'Easy';
            case 'medium': return 'Medium';
            case 'hard': return 'Hard';
            default: return 'Total';
        }
    };

    return (
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
                            { key: 'all', label: 'Overall' },
                            { key: 'easy', label: 'Easy' },
                            { key: 'medium', label: 'Medium' },
                            { key: 'hard', label: 'Hard' }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                className={filter === tab.key ? 'active' : ''}
                                onClick={() => setFilter(tab.key)}
                                disabled={loading}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="loading-state">
                        <p>Loading leaderboard...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="error-state">
                        <p>{error}</p>
                    </div>
                )}

                {/* Top 3 Podium */}
                {!loading && leaderboardData.length > 0 && (
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
                                    <span><Target size={12} /> {getSolvedCount(user)} solved</span>
                                    <span>•</span>
                                    <span><Zap size={12} /> {user.streak} day streak</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Leaderboard Table */}
                {!loading && leaderboardData.length > 3 && (
                    <div className="leaderboard-table">
                        <div className="table-header">
                            <span>Rank</span>
                            <span>User</span>
                            <span>Score</span>
                            <span>{getDifficultyLabel()} Solved</span>
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
                                <div className="col-solved">{getSolvedCount(user)}</div>
                                <div className="col-streak">{user.streak} days</div>
                                <div className={`change-icon ${user.change}`}>
                                    {user.change === 'up' && <TrendingUp size={18} />}
                                    {user.change === 'down' && <TrendingDown size={18} />}
                                    {user.change === 'same' && <Minus size={18} />}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Your Rank Card */}
                <div className="your-rank-card">
                    <div className="your-rank-info">
                        <div className="your-rank-label">Your Rank ({getDifficultyLabel()})</div>
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
    );
}