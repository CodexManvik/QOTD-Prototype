import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [difficulty, setDifficulty] = useState('easy');

    useEffect(() => {
        // eslint-disable-next-line
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/leaderboard?difficulty=${difficulty}`)
            .then(res => res.json())
            .then(data => {
                setLeaders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [difficulty]);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-brand-900">Daily Leaderboard</h1>
                <p className="text-brand-700">Top performers for today&apos;s challenge.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-8">
                {['easy', 'medium', 'hard'].map((level) => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${difficulty === level
                            ? 'bg-brand-600 text-white shadow-md'
                            : 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50'
                            }`}
                    >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-12 text-brand-400 animate-pulse">Loading rankings...</div>
            ) : (
                <motion.div
                    className="bg-white rounded-2xl border border-brand-100 shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <table className="w-full">
                        <thead className="bg-brand-50/50 text-left">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-brand-500 uppercase tracking-wider">Rank</th>
                                <th className="px-6 py-4 text-xs font-semibold text-brand-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-semibold text-brand-500 uppercase tracking-wider">Score</th>
                                <th className="px-6 py-4 text-xs font-semibold text-brand-500 uppercase tracking-wider">Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-100">
                            {leaders.length === 0 ? (
                                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No submissions yet. Be the first!</td></tr>
                            ) : (
                                leaders.map((entry, index) => (
                                    <tr key={index} className="hover:bg-brand-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`
                         flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                         ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                    index === 1 ? 'bg-gray-100 text-gray-700' :
                                                        index === 2 ? 'bg-orange-100 text-orange-700' : 'text-brand-600'
                                                }
                       `}>
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-brand-900">{entry.userId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-brand-700">{entry.score}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-brand-500 text-sm">{new Date(entry.timestamp).toLocaleTimeString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </motion.div>
            )}
        </div>
    );
}
