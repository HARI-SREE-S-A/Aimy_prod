import Header from '@/components/Header';
import Footer from '@/components/Footer';
import downloads from '@/data/downloads.json';

export const metadata = {
  title: 'Downloads | Aimy India',
  description: 'Download Aimy India product catalogs, price lists, and brochures.',
};

export default function DownloadsPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Downloads</span>
            </div>
            <h1>Downloads</h1>
            <p>Access our latest catalogs, brochures, and price lists.</p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title">Product <span>Catalogs & Pricing</span></h2>
              <div className="accent-line"></div>
              <p>Download our official documentation in PDF format.</p>
            </div>

            <div className="download-grid">
              {downloads.map((doc, idx) => (
                <a 
                  key={idx} 
                  href={doc.file} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="download-icon">📄</div>
                  <div className="download-info">
                    <h3>{doc.name}</h3>
                    <p>{doc.category} • PDF</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div style={{ marginTop: '4rem', padding: '2rem', background: '#f9f9f9', borderRadius: '10px', display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem' }}>💡</div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Need customized solutions?</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>
                  If you require custom lighting solutions or bulk project pricing that isn't covered in our standard catalogs, our sales team is here to help.
                </p>
                <a href="/contact" className="btn btn-outline btn-sm">Contact Sales Team</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
