import Header from '@/components/Header';
import Footer from '@/components/Footer';
import pagesData from '@/data/pages.json';

export const metadata = {
  title: 'Warranty Policy | Aimy India',
  description: 'Information about our product warranties and guarantees.',
};

export default function Page() {
  const pageContent = pagesData['warranty-policy']?.content || '<p>Detailed content for this section will be updated by the site administrator.</p>';

  return (
    <>
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Warranty Policy</span>
            </div>
            <h1>Warranty Policy</h1>
          </div>
        </section>
        <section className="section">
          <div className="container text-content">
            <p style={{fontSize: '1.1rem', color: '#666', lineHeight: 1.8}}>Information about our product warranties and guarantees.</p>
            <div 
              style={{ marginTop: '2rem', color: '#444' }}
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}