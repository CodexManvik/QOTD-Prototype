import ThemeToggle from './ThemeToggle';
import './Navbar.css';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'QOTD', href: '/qotd' },
    { label: 'Practice', href: '/practice' },
    { label: 'Interview Prep', href: '/interview' },
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
              to={item.href}
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
