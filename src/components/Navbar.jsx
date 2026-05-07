import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Home, Utensils, Calendar, Tag, Menu, X } from 'lucide-react';
import Switch from './ui/sky-toggle';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    window.location.href = '/';
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Utensils, label: "Menu", href: "/menu" },
    { icon: Calendar, label: "Booking", href: "/bookings" },
    { icon: Tag, label: "Offers", href: "/offers" },
  ];

  // Premium Local Logos
  const darkLogo = "/logo-gold.png";
  const lightLogo = "/logo-dark.png";

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="container">
        <Link to="/" className="nav-brand">
          <div className="logo-wrap">
            <img 
              src={isDarkMode ? darkLogo : lightLogo} 
              alt="Palace Logo" 
              className="brand-logo-img"
            />
          </div>
          <span className="brand-text">The Palace</span>
        </Link>

        {/* Mobile Toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Centered Premium Slide Menu */}
        <div className={`nav-menu-center ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.label}>
                  <Link 
                    to={item.href}
                    className={`menu-item-link ${isActive ? 'active' : ''}`}
                  >
                    <div className="menu-item-inner">
                      {/* Current State (Top) */}
                      <div className="menu-item-text">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {/* Hover State (Bottom - will slide up) */}
                      <div className="menu-item-text hover-text">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                    </div>
                    {isActive && <div className="active-underline" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav-links">
          <Link to="/cart" className="nav-link-action" style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingBag size={22} />
          </Link>
          
          <div className="toggle-wrap">
            <Switch checked={!isDarkMode} onChange={toggleTheme} />
          </div>

          {user ? (
            <div className="user-nav-actions">
              <Link to="/dashboard" className="nav-link-user">
                {user.name.split(' ')[0]}
              </Link>
              <button onClick={logoutHandler} className="nav-btn-pill">
                LOGOUT
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-btn-pill">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
