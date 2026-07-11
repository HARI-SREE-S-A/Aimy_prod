import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg" style={{ backgroundImage: 'url(/images/backgrounds/footer-bg.jpg)' }} />
      <div className="footer-inner container-wide">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src="/images/brand/logo.png" alt="Aimy India" style={{ height: 50, width: 'auto' }} />
            <p>
              Aimy India is a leading manufacturer of energy-efficient LED lighting solutions.
              We are committed to providing high-quality, innovative, and sustainable lighting
              products that are proudly Made in India.
            </p>
            <div className="footer-badge">
              <img src="/images/brand/make-india-logo.png" alt="Made in India" />
              <span>Made in India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/about/">About Us</Link></li>
              <li><Link href="/products/">Products</Link></li>
              <li><Link href="/gallery/">Gallery</Link></li>
              <li><Link href="/downloads/">Downloads</Link></li>
              <li><Link href="/careers/">Careers</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link href="/support/">Customer Support</Link></li>
              <li><Link href="/warranty-policy/">Warranty Policy</Link></li>
              <li><Link href="/business-with-us/">Business With Us</Link></li>
              <li><Link href="/certificates/">Certificates</Link></li>
              <li><Link href="/contact/">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📍</div>
              <div>
                <strong style={{ color: '#fff' }}>Aimy India</strong><br />
                Kerala, India
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📧</div>
              <div>
                <a href="mailto:info@aimyindia.in">info@aimyindia.in</a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-icon">📱</div>
              <div>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">▶</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◉</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom container-wide">
        <span>© {new Date().getFullYear()} Aimy India - Lighting Solutions. All rights reserved.</span>
        <span>Energy Efficient Lighting Products — Made in India</span>
      </div>
    </footer>
  );
}
