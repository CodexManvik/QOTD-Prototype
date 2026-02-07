import Navbar from '../components/ui/Navbar';
import { useUser } from '../contexts/UserContext';

export default function MainLayout({ children }) {
    const { user, updateUser } = useUser();

    return (
        <div className="min-h-screen bg-brand-50 text-foreground overflow-x-hidden selection:bg-brand-200 selection:text-brand-900 relative">

            {/* Dev User Switcher */}
            <div className="fixed top-20 right-4 z-50 bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-brand-200 shadow-sm text-xs flex gap-2 items-center">
                <span className="font-bold text-brand-700">Dev User:</span>
                <input
                    className="border rounded px-1 w-24 bg-transparent"
                    value={user.userId}
                    onChange={(e) => updateUser(e.target.value, user.role)}
                />
                <select
                    className="border rounded px-1 bg-transparent"
                    value={user.role}
                    onChange={(e) => updateUser(user.userId, e.target.value)}
                >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <Navbar />
            <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto">
                {children}
            </main>

            {/* Background decoration */}
            <div className="fixed inset-0 -z-20 h-full w-full bg-brand-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-400 opacity-20 blur-[100px]"></div>
        </div>
    );
}
