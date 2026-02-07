import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-4 border border-brand-200">
                    Reimagined Coding Interviews
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-950 max-w-4xl">
                    Master Algorithms with <span className="text-brand-600">Style.</span>
                </h1>
                <p className="mt-6 text-lg text-brand-800/80 max-w-2xl mx-auto leading-relaxed">
                    Daily coding challenges wrapped in a premium, distraction-free interface.
                    Build your streak, climb the leaderboard, and secure your dream job.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex gap-4"
            >
                <Link
                    to="/solve"
                    className="px-8 py-3 rounded-xl bg-brand-600 text-white font-semibold shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:scale-105 transition-all duration-300"
                >
                    Start Coding
                </Link>
                <Link
                    to="/leaderboard"
                    className="px-8 py-3 rounded-xl bg-white text-brand-700 font-semibold border border-brand-200 hover:bg-brand-50 transition-all duration-300"
                >
                    View Leaderboard
                </Link>
            </motion.div>

            {/* Floating Elements Animation usually goes here */}
        </div>
    );
}
