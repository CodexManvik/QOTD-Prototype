import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Clock, Target, Award, Flame } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalSolved: 42,
        currentStreak: 5,
        bestStreak: 12,
        avgTime: '8m 32s',
        rank: 156,
        totalUsers: 2847,
        easyCount: 25,
        mediumCount: 14,
        hardCount: 3
    });

    const recentActivity = [
        { id: 1, problem: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '5m 23s', date: 'Today' },
        { id: 2, problem: 'Valid Parentheses', difficulty: 'Easy', status: 'Solved', time: '3m 45s', date: 'Today' },
        { id: 3, problem: 'Merge Intervals', difficulty: 'Medium', status: 'Attempted', time: '15m 00s', date: 'Yesterday' },
        { id: 4, problem: 'LRU Cache', difficulty: 'Hard', status: 'Solved', time: '25m 12s', date: '2 days ago' },
    ];

    const achievements = [
        { id: 1, name: 'First Solve', icon: '🎯', unlocked: true },
        { id: 2, name: '7-Day Streak', icon: '🔥', unlocked: true },
        { id: 3, name: 'Speed Demon', icon: '⚡', unlocked: true },
        { id: 4, name: '30-Day Streak', icon: '🏆', unlocked: false },
        { id: 5, name: 'Problem Master', icon: '👑', unlocked: false },
    ];

    return (
            <main className="dashboard-page">
                <div className="dashboard-container">
                    <header className="dashboard-header">
                        <h1>Your Dashboard</h1>
                        <p>Track your progress and achievements</p>
                    </header>

                    <div className="stats-grid">
                        <div className="stat-card highlight">
                            <div className="stat-icon"><Flame size={24} /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.currentStreak}</span>
                                <span className="stat-label">Day Streak</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Target size={24} /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.totalSolved}</span>
                                <span className="stat-label">Problems Solved</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Clock size={24} /></div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.avgTime}</span>
                                <span className="stat-label">Avg. Solve Time</span>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Trophy size={24} /></div>
                            <div className="stat-info">
                                <span className="stat-value">#{stats.rank}</span>
                                <span className="stat-label">Global Rank</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <section className="progress-section">
                            <h2>Problem Breakdown</h2>
                            <div className="difficulty-bars">
                                <div className="difficulty-row">
                                    <span className="diff-label easy">Easy</span>
                                    <div className="diff-bar-container">
                                        <div className="diff-bar easy" style={{ width: `${(stats.easyCount / 50) * 100}%` }}></div>
                                    </div>
                                    <span className="diff-count">{stats.easyCount}/50</span>
                                </div>
                                <div className="difficulty-row">
                                    <span className="diff-label medium">Medium</span>
                                    <div className="diff-bar-container">
                                        <div className="diff-bar medium" style={{ width: `${(stats.mediumCount / 30) * 100}%` }}></div>
                                    </div>
                                    <span className="diff-count">{stats.mediumCount}/30</span>
                                </div>
                                <div className="difficulty-row">
                                    <span className="diff-label hard">Hard</span>
                                    <div className="diff-bar-container">
                                        <div className="diff-bar hard" style={{ width: `${(stats.hardCount / 20) * 100}%` }}></div>
                                    </div>
                                    <span className="diff-count">{stats.hardCount}/20</span>
                                </div>
                            </div>
                        </section>

                        <section className="achievements-section">
                            <h2>Achievements</h2>
                            <div className="achievements-grid">
                                {achievements.map(a => (
                                    <div key={a.id} className={`achievement ${a.unlocked ? 'unlocked' : 'locked'}`}>
                                        <span className="achievement-icon">{a.icon}</span>
                                        <span className="achievement-name">{a.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <section className="activity-section">
                        <h2>Recent Activity</h2>
                        <div className="activity-list">
                            {recentActivity.map(item => (
                                <div key={item.id} className="activity-item">
                                    <div className="activity-problem">
                                        <span className="problem-name">{item.problem}</span>
                                        <span className={`difficulty-tag ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span>
                                    </div>
                                    <div className="activity-meta">
                                        <span className={`status ${item.status.toLowerCase()}`}>{item.status}</span>
                                        <span className="time">{item.time}</span>
                                        <span className="date">{item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
    );
}
