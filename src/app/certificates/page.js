import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Certificates | Aimy India',
  description: 'Our quality and safety certifications.',
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Certificates</span>
            </div>
            <h1>Certificates</h1>
          </div>
        </section>
        <section className="section">
          <div className="container text-content">
            <p style={{fontSize: '1.1rem', color: '#666', lineHeight: 1.8}}>Our quality and safety certifications.</p>
            <div style={{padding: '3rem', background: '#f9f9f9', borderRadius: '10px', textAlign: 'center', marginTop: '2rem', color: '#888'}}>
              Detailed content for this section will be updated by the site administrator.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}