'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/about/',
    children: [
      { label: 'About Us', href: '/about/' },
      { label: 'Management', href: '/management/' },
      { label: 'Certificates', href: '/certificates/' },
      { label: 'News Feeds', href: '/news-feeds/' },
    ]
  },
  { label: 'Products', href: '/products/' },
  { label: 'Gallery', href: '/gallery/' },
  {
    label: 'More', href: '#',
    children: [
      { label: 'Support', href: '/support/' },
      { label: 'Business With Us', href: '/business-with-us/' },
      { label: 'Warranty Policy', href: '/warranty-policy/' },
      { label: 'Downloads', href: '/downloads/' },
      { label: 'Careers', href: '/careers/' },
    ]
  },
  { label: 'Contact', href: '/contact/' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <img src="/images/brand/logo.png" alt="Aimy India" />
          </Link>

          <nav className="nav">
            {navItems.map((item) => (
              <div key={item.label} className="nav-item">
                <Link href={item.href} className="nav-link">
                  {item.label}
                  {item.children && <span className="arrow">▼</span>}
                </Link>
                {item.children && (
                  <div className="dropdown">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} className="dropdown-link">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className={`menu-toggle ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`mobile-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={() => setMobileOpen(false)}
        style={{ display: mobileOpen ? 'block' : 'none' }}
      />
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
            {item.children && (
              <div className="mobile-subnav">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="mobile-nav-link"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
