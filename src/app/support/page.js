import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCollectionData } from '@/lib/data';
export const metadata = {
  title: 'Customer Support | Aimy India',
  description: 'We are here to help you with your lighting products.',
};

export default async function Page() {
  const pagesData = await getCollectionData('pages');
  const siteSettings = await getCollectionData('siteSettings');
  const pageContent = pagesData['support']?.content || '<p>Detailed content for this section will be updated by the site administrator.</p>';

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Customer Support</span>
            </div>
            <h1>Customer Support</h1>
          </div>
        </section>
        <section className="section">
          <div className="container text-content">
            <p style={{fontSize: '1.1rem', color: '#666', lineHeight: 1.8}}>We are here to help you with your lighting products.</p>
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