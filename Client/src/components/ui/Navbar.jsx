import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useState } from 'react';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Build', path: '/solve' },
    { name: 'Dashboard', path: '/leaderboard' },
];

export default function Navbar() {
    const location = useLocation();
    const [hoveredPath, setHoveredPath] = useState(null);

    return (
        <nav className="fixed top-4 inset-x-0 max-w-2xl mx-auto z-50">
            <div className="relative flex items-center justify-center gap-2 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full p-2 shadow-xl">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => setHoveredPath(item.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-semibold transition-colors duration-200 rounded-full",
                                isActive ? "text-white" : "text-brand-950 hover:text-brand-700"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-brand-500 rounded-full -z-10"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {hoveredPath === item.path && !isActive && (
                                <motion.div
                                    layoutId="nav-hover"
                                    className="absolute inset-0 bg-brand-100/50 rounded-full -z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                />
                            )}
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
