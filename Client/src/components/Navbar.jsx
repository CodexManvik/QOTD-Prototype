import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'QOTD', path: '/' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path, label) => {
    if (label === 'QOTD' && location.pathname === '/') return true;
    if (label === 'Home') return false;
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="TLS Logo" className="logo-image" />
        </Link>

        <div className="pill-nav">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`pill-nav-item ${isActive(item.path, item.label) ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
