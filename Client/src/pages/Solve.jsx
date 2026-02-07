import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuestionCard from '../legacy/QuestionCard';
import CodeEditor from '../legacy/CodeEditor';

export default function Solve() {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/qotd`)
            .then(res => res.json())
            .then(data => {
                setQuestion(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load question:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20 text-brand-500">Loading challenge...</div>;
    if (!question) return <div className="text-center py-20 text-red-500">Failed to load challenge.</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[85vh]"
        >
            {/* Question Panel */}
            <div className="bg-white rounded-2xl border border-brand-200 shadow-sm overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-brand-100 bg-brand-50/50">
                    <h2 className="font-semibold text-brand-900">Problem Statement</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-0 scrollbar-hide">
                    <QuestionCard question={question} />
                </div>
            </div>

            {/* Editor Panel */}
            <div className="bg-[#1e1e1e] rounded-2xl border border-gray-800 shadow-xl overflow-hidden flex flex-col h-full">
                <div className="p-4 border-b border-gray-700 bg-[#252526] flex justify-between items-center">
                    <h2 className="font-semibold text-gray-200 text-sm">Code Editor</h2>
                    <span className="text-xs text-gray-400">Auto-saved</span>
                </div>
                <div className="flex-1 overflow-hidden [&_.code-editor]:h-full [&_.code-mirror-editor]:h-full">
                    <CodeEditor questionId={question.id} />
                </div>
            </div>
        </motion.div>
    );
}
