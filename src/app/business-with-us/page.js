import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCollectionData } from '@/lib/data';
export const metadata = {
  title: 'Business With Us | Aimy India',
  description: 'Partner with Aimy India for your projects and retail needs.',
};

export default async function Page() {
  const pagesData = await getCollectionData('pages');
  const siteSettings = await getCollectionData('siteSettings');
  const pageContent = pagesData['business-with-us']?.content || '<p>Detailed content for this section will be updated by the site administrator.</p>';

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Business With Us</span>
            </div>
            <h1>Business With Us</h1>
          </div>
        </section>
        <section className="section">
          <div className="container text-content">
            <p style={{fontSize: '1.1rem', color: '#666', lineHeight: 1.8}}>Partner with Aimy India for your projects and retail needs.</p>
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