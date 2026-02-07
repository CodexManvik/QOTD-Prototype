import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'QOTD', path: '/qotd' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="TLS Logo" className="logo-image" />
        </Link>

        <div className="pill-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `pill-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
