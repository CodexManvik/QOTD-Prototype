import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    Trophy,
    Clock,
    Target,
    Flame,
    Zap,
    Award,
    Crown,
    BarChart2,
    Calendar,
    ArrowUpRight,
    MoreHorizontal,
    Activity,
    CheckCircle2,
    User,
    Star,
    Shield
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
    const { user, isAuthenticated, role } = useAuth();

    const [stats] = useState({
        totalSolved: 42,
        currentStreak: 5,
        bestStreak: 12,
        avgTime: '8m 32s',
        rank: 156,
        percentile: 'Top 5%',
        easyCount: 25,
        mediumCount: 14,
        hardCount: 3
    });

    const recentActivity = [
        { id: 1, problem: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '5m 23s', date: 'Just now' },
        { id: 2, problem: 'Valid Parentheses', difficulty: 'Easy', status: 'Solved', time: '3m 45s', date: '2h ago' },
        { id: 3, problem: 'Merge Intervals', difficulty: 'Medium', status: 'Attempted', time: '15m 00s', date: 'Yesterday' },
        { id: 4, problem: 'LRU Cache', difficulty: 'Hard', status: 'Solved', time: '25m 12s', date: '2 days ago' },
    ];

    const achievements = [
        { id: 1, name: 'First Blood', icon: Target, unlocked: true, level: 1 },
        { id: 2, name: 'On Fire', icon: Flame, unlocked: true, level: 2 },
        { id: 3, name: 'Speedster', icon: Zap, unlocked: true, level: 1 },
        { id: 4, name: 'Marathon', icon: Trophy, unlocked: false, level: 0 },
    ];

    const getRoleBadge = () => {
        switch (role) {
            case 'admin':
                return <span className="role-badge-dash admin"><Shield size={14} /> Admin</span>;
            case 'paid':
                return <span className="role-badge-dash paid"><Star size={14} /> Premium</span>;
            default:
                return <span className="role-badge-dash free"><User size={14} /> Free</span>;
        }
    };

    const getRoleLimits = () => {
        switch (role) {
            case 'admin': return { runs: '∞', submissions: '∞' };
            case 'paid': return { runs: '4/day', submissions: '1/day' };
            default: return { runs: '2/day', submissions: '1/day' };
        }
    };

    const limits = getRoleLimits();

    return (
        <div className="dashboard-page">
            <div className="dashboard-layout">
                <header className="dash-header">
                    <div className="header-left">
                        <span className="greeting">Good evening, {user?.name || 'Guest'}</span>
                        <h1>Overview</h1>
                    </div>
                    <div className="header-right">
                        {isAuthenticated && getRoleBadge()}
                        <button className="secondary-btn">
                            <Calendar size={18} />
                            <span>Feb 2025</span>
                        </button>
                        <button className="primary-btn">
                            <BarChart2 size={18} />
                            <span>Analytics</span>
                        </button>
                    </div>
                </header>

                {/* Account Info Card - only show if logged in */}
                {isAuthenticated && (
                    <div className="account-info-card">
                        <div className="account-details">
                            <div className="account-avatar">
                                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U'}
                            </div>
                            <div className="account-text">
                                <span className="account-name">{user?.name}</span>
                                <span className="account-email">{user?.email}</span>
                            </div>
                        </div>
                        <div className="account-limits">
                            <div className="limit-item">
                                <span className="limit-label">Daily Runs</span>
                                <span className="limit-value">{limits.runs}</span>
                            </div>
                            <div className="limit-item">
                                <span className="limit-label">Submissions</span>
                                <span className="limit-value">{limits.submissions}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hero Stats Area */}
                <div className="stats-showcase">
                    <div className="stat-card hero-card">
                        <div className="card-content">
                            <div className="hero-icon-wrapper">
                                <Flame size={28} />
                            </div>
                            <div className="hero-data">
                                <span className="label">Current Streak</span>
                                <div className="value-group">
                                    <span className="value">{stats.currentStreak}</span>
                                    <span className="unit">days</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-graph">
                            {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                                <div key={i} className="bar" style={{ height: `${h}%`, opacity: i === 6 ? 1 : 0.4 }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="stat-card standard-card">
                        <div className="card-header">
                            <span className="label">Total Solved</span>
                            <div className="icon-mini blue"><Target size={16} /></div>
                        </div>
                        <div className="card-body">
                            <span className="value">{stats.totalSolved}</span>
                            <span className="trend positive">
                                <ArrowUpRight size={14} /> 12%
                            </span>
                        </div>
                    </div>

                    <div className="stat-card standard-card">
                        <div className="card-header">
                            <span className="label">Global Rank</span>
                            <div className="icon-mini gold"><Trophy size={16} /></div>
                        </div>
                        <div className="card-body">
                            <span className="value">#{stats.rank}</span>
                            <span className="sub-text">{stats.percentile}</span>
                        </div>
                    </div>

                    <div className="stat-card standard-card">
                        <div className="card-header">
                            <span className="label">Avg Time</span>
                            <div className="icon-mini purple"><Clock size={16} /></div>
                        </div>
                        <div className="card-body">
                            <span className="value">{stats.avgTime}</span>
                            <span className="sub-text">Per medium q</span>
                        </div>
                    </div>
                </div>

                <div className="main-grid">
                    <div className="col-left">
                        <section className="panel-card">
                            <div className="panel-header">
                                <h3>Difficulty Breakdown</h3>
                                <button className="icon-btn"><MoreHorizontal size={20} /></button>
                            </div>
                            <div className="diff-stats-container">
                                <div className="diff-row">
                                    <div className="diff-meta">
                                        <span className="diff-badge easy">Easy</span>
                                        <span className="diff-nums">{stats.easyCount} <span className="total">/ 50</span></span>
                                    </div>
                                    <div className="progress-rail">
                                        <div className="progress-fill easy" style={{ width: '50%' }}></div>
                                    </div>
                                </div>
                                <div className="diff-row">
                                    <div className="diff-meta">
                                        <span className="diff-badge medium">Medium</span>
                                        <span className="diff-nums">{stats.mediumCount} <span className="total">/ 30</span></span>
                                    </div>
                                    <div className="progress-rail">
                                        <div className="progress-fill medium" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div className="diff-row">
                                    <div className="diff-meta">
                                        <span className="diff-badge hard">Hard</span>
                                        <span className="diff-nums">{stats.hardCount} <span className="total">/ 20</span></span>
                                    </div>
                                    <div className="progress-rail">
                                        <div className="progress-fill hard" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="panel-card">
                            <div className="panel-header">
                                <h3>Recent Activity</h3>
                                <button className="icon-btn"><Activity size={20} /></button>
                            </div>
                            <div className="activity-feed">
                                {recentActivity.map((item) => (
                                    <div key={item.id} className="feed-item">
                                        <div className={`status-indicator ${item.status === 'Solved' ? 'solved' : 'attempt'}`}>
                                            {item.status === 'Solved' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                                        </div>
                                        <div className="feed-content">
                                            <div className="feed-title">{item.problem}</div>
                                            <div className="feed-meta">
                                                <span className={`diff-dot ${item.difficulty.toLowerCase()}`}></span>
                                                {item.difficulty} • {item.time}
                                            </div>
                                        </div>
                                        <div className="feed-time">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="col-right">
                        <section className="panel-card achievement-panel">
                            <div className="panel-header">
                                <h3>Badges</h3>
                                <span className="badge-count">3/12</span>
                            </div>
                            <div className="badges-grid">
                                {achievements.map((a) => (
                                    <div key={a.id} className={`badge-item ${a.unlocked ? 'unlocked' : 'locked'}`}>
                                        <div className="badge-circle">
                                            <a.icon size={24} />
                                        </div>
                                        <span className="badge-name">{a.name}</span>
                                    </div>
                                ))}
                                <div className="badge-item locked">
                                    <div className="badge-circle"><Crown size={24} /></div>
                                    <span className="badge-name">Master</span>
                                </div>
                                <div className="badge-item locked">
                                    <div className="badge-circle"><Award size={24} /></div>
                                    <span className="badge-name">Elite</span>
                                </div>
                            </div>
                            <button className="view-all-btn">View All Badges</button>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
