import ThemeToggle from './ThemeToggle';
import './Navbar.css';

export default function Navbar() {
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'QOTD', href: '#', active: true },
    { label: 'Practice', href: '#' },
    { label: 'Interview Prep', href: '#' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src="/logo.png" alt="TLS Logo" className="logo-image" />
        </a>

        <div className="pill-nav">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`pill-nav-item ${item.active ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
