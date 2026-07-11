import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCollectionData } from '@/lib/data';
export const metadata = {
  title: 'About Us | Aimy India',
  description: 'Learn more about Aimy India, our mission, and our vision for the future of lighting.',
};

export default async function Page() {
  const siteSettings = await getCollectionData('siteSettings');

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">About Us</span>
            </div>
            <h1>About Us</h1>
            <p>Discover the legacy and vision behind Aimy India.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <h2 className="section-title" style={{ textAlign: 'left' }}>Who We <span>Are</span></h2>
                <div className="accent-line" style={{ margin: '0 0 2rem 0' }}></div>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  Aimy India is a premier manufacturer and supplier of Nextgen Luminaries, dedicated to revolutionizing the way we illuminate our spaces. With a commitment to innovation, energy efficiency, and uncompromising quality, we have established ourselves as a trusted name in the LED lighting industry.
                </p>
                <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.8 }}>
                  Our locally produced, world-class products span across residential, commercial, and industrial applications. From elegant indoor fixtures to highly durable outdoor solutions, every Aimy product is engineered to deliver exceptional performance, longevity, and aesthetic brilliance.
                </p>
              </div>
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <img src={siteSettings.aboutHeroImage || "/images/backgrounds/hero-warehouse.jpg"} alt="Aimy India Manufacturing" style={{ width: '100%', height: 'auto', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(227,30,36,0.2), transparent)' }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-gray">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div className="feature-card" style={{ textAlign: 'left', padding: '3rem' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(227,30,36,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E31E24', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>Our Mission</h3>
                <p className="feature-text" style={{ fontSize: '1.05rem' }}>
                  To illuminate the world with energy-efficient, durable, and elegantly designed lighting solutions that enhance the quality of life while promoting environmental sustainability.
                </p>
              </div>
              <div className="feature-card" style={{ textAlign: 'left', padding: '3rem' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(227,30,36,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E31E24', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fas fa-eye"></i>
                </div>
                <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>Our Vision</h3>
                <p className="feature-text" style={{ fontSize: '1.05rem' }}>
                  To be the leading innovator in LED technology across India and globally, setting the industry standard for performance, reliability, and customer satisfaction.
                </p>
              </div>
              <div className="feature-card" style={{ textAlign: 'left', padding: '3rem' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(227,30,36,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E31E24', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="feature-title" style={{ fontSize: '1.5rem' }}>Our Values</h3>
                <p className="feature-text" style={{ fontSize: '1.05rem' }}>
                  Integrity in our manufacturing, excellence in our engineering, and a relentless dedication to exceeding our customers' expectations in every project we undertake.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}