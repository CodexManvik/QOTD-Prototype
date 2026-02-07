import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
import QuestionCard from './components/QuestionCard';
import CodeEditor from './components/CodeEditor';
import Sidebar from './components/Sidebar';
import DailyCTA from './components/DailyCTA';
import ClickSpark from './components/ClickSpark';
import Home from './components/Home';
import Dashboard from './pages/Dashboard';
import Leaderboard from './pages/Leaderboard';
import './App.css';

export default function App() {
  return (
    <ClickSpark>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/qotd"
            element={
              <>
                <PageHeader />
                <main className="main-content">
                  <div className="content-container">
                    <div className="left-column">
                      <QuestionCard />
                    </div>
                    <div className="center-column">
                      <CodeEditor />
                    </div>
                    <div className="right-column">
                      <Sidebar />
                    </div>
                  </div>
                </main>
                <DailyCTA />
              </>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </ClickSpark>
  );
}
