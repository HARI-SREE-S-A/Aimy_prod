import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Aimy India',
  description: 'Get in touch with Aimy India for premium LED lighting solutions.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Contact Us</span>
            </div>
            <h1>Contact Us</h1>
            <p>We're here to help with your lighting needs.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="contact-grid">
              
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1a1a1a' }}>Get In Touch</h2>
                <p style={{ color: '#666', marginBottom: '2rem', lineHeight: 1.6 }}>
                  Whether you have a question about our products, need assistance with an order, or want to discuss a bulk purchase for your project, our team is ready to answer all your questions.
                </p>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">📍</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Head Office</h3>
                    <p style={{ color: '#666', lineHeight: 1.5 }}>
                      Aimy India<br />
                      Kerala, India
                    </p>
                  </div>
                </div>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">📞</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Phone</h3>
                    <p style={{ color: '#666', lineHeight: 1.5 }}>
                      <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43210</a><br />
                      Mon-Sat: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="contact-info-card">
                  <div className="contact-info-icon">✉️</div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Email</h3>
                    <p style={{ color: '#666', lineHeight: 1.5 }}>
                      <a href="mailto:info@aimyindia.in" style={{ color: 'inherit', textDecoration: 'none' }}>info@aimyindia.in</a><br />
                      <a href="mailto:sales@aimyindia.in" style={{ color: 'inherit', textDecoration: 'none' }}>sales@aimyindia.in</a>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section style={{ height: '400px', width: '100%', background: '#eee', position: 'relative' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d3929.567156157972!2d76.2941323!3d9.970146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%,20Kerala!5e0!3m2!1sen!2sin!4v1689582136000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Aimy India Location"
          ></iframe>
        </section>
      </main>

      <Footer />
    </>
  );
}
