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
        <div className="navbar-logo">
          <span className="logo-text">tls</span>
        </div>

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
      </div>
    </nav>
  );
}
