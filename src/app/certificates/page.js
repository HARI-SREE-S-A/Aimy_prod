import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCollectionData } from '@/lib/data';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Certificates | Aimy India',
  description: 'Our quality and safety certifications.',
};

export default async function Page() {
  const pagesData = await getCollectionData('pages');
  const siteSettings = await getCollectionData('siteSettings');
  const pageContent = pagesData['certificates']?.content || '<p>Detailed content for this section will be updated by the site administrator.</p>';

  return (
    <>
      <Header siteSettings={siteSettings} />
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
            <div 
              style={{ marginTop: '2rem', color: '#444' }}
              dangerouslySetInnerHTML={{ __html: pageContent }}
            />
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}