import Navbar from './components/Navbar';
import PageHeader from './components/PageHeader';
import QuestionCard from './components/QuestionCard';
import CodeEditor from './components/CodeEditor';
import Sidebar from './components/Sidebar';
import DailyCTA from './components/DailyCTA';
import ClickSpark from './components/ClickSpark';
import './App.css';

export default function App() {
  return (
    <ClickSpark>
      <div className="app">
        <Navbar />
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
      </div>
    </ClickSpark>
  );
}
