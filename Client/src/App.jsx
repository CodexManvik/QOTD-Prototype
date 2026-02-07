import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
// Lazy load these later if optimizing further, but distinct imports for now for stability
import Solve from './pages/Solve';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solve" element={<Solve />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
