import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import { supabase } from '@/lib/supabase';
import ScrollReveal from '@/components/ScrollReveal';

// Helper to fetch banners (if Supabase is configured)
async function getBanners() {
  try {
    const { data } = await supabase
      .from('banners')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    return data || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const banners = await getBanners();
  
  // Fallback hero if no banners
  const heroData = banners.length > 0 ? banners[0] : {
    title: 'Transform Your Space With Brilliant LED Lighting',
    subtitle: 'Premium quality, energy-efficient lighting solutions manufactured in India.',
    image_url: '/images/backgrounds/hero-warehouse.jpg',
    cta_text: 'Explore Products',
    cta_link: '/products'
  };

  return (
    <>
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-bg">
            <img src={heroData.image_url} alt="Hero Background" />
          </div>
          <div className="hero-overlay"></div>
          
          <div className="hero-float hero-float-1"></div>
          <div className="hero-float hero-float-2"></div>
          
          <div className="container-wide">
            <ScrollReveal direction="up" className="hero-content">
              <div className="hero-badge">Made in India</div>
              <h1>
                {heroData.title.split(' ').map((word, i, arr) => 
                  i === arr.length - 1 ? <span key={i}>{word}</span> : word + ' '
                )}
              </h1>
              <p>{heroData.subtitle}</p>
              
              <div className="hero-actions">
                <Link href={heroData.cta_link || "/products"} className="btn btn-primary btn-lg">
                  {heroData.cta_text || "Explore Products"}
                </Link>
                <Link href="/contact" className="btn btn-outline btn-white btn-lg">
                  Contact Us
                </Link>
              </div>
              
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-value">5+</div>
                  <div className="hero-stat-label">Years of Excellence</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">100<span>%</span></div>
                  <div className="hero-stat-label">Quality Assured</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">50<span>+</span></div>
                  <div className="hero-stat-label">Products</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FEATURES / WHY CHOOSE US */}
        <section className="section section-gray">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title">Why Choose <span>Aimy India</span></h2>
              <p className="section-subtitle">We deliver premium lighting solutions that combine innovation, efficiency, and exceptional design.</p>
            </div>
            
            <div className="features-grid">
              <ScrollReveal direction="up" delay={0.1}>
                <div className="feature-card">
                  <div className="feature-icon">🌿</div>
                  <h3 className="feature-title">Energy Efficient</h3>
                  <p className="feature-text">Our LED lights consume up to 80% less energy than traditional lighting, helping you reduce your carbon footprint and save on energy bills.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.2}>
                <div className="feature-card">
                  <div className="feature-icon">🛡️</div>
                  <h3 className="feature-title">Long Lifespan</h3>
                  <p className="feature-text">Built with premium components, Aimy products are designed to last for thousands of hours, ensuring long-term reliability and low maintenance.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.3}>
                <div className="feature-card">
                  <div className="feature-icon">🇮🇳</div>
                  <h3 className="feature-title">Made in India</h3>
                  <p className="feature-text">We are a proud Indian manufacturer contributing to the Make in India initiative with locally produced, world-class products.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* PRODUCT CATEGORIES OVERVIEW */}
        <section className="section">
          <div className="container-wide">
            <div className="text-center">
              <h2 className="section-title">Our Lighting <span>Collections</span></h2>
              <div className="accent-line"></div>
            </div>
            
            <div className="category-grid" style={{ marginTop: '3rem' }}>
              <ScrollReveal direction="up" delay={0.1}>
                <Link href="/products#indoor-lighting" className="category-card">
                  <ImageWithFallback 
                    src="/images/products/downlight-que-es-y-para-que-se-utiliza.png" 
                    alt="Indoor Lighting" 
                    fallbackSrc="/images/backgrounds/hero-warehouse.jpg" 
                  />
                  <div className="category-card-content">
                    <h3 className="category-card-title">Indoor Lighting</h3>
                    <span className="category-card-count">Premium indoor fixtures</span>
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.2}>
                <Link href="/products#outdoor-lighting" className="category-card">
                  <ImageWithFallback 
                    src="/images/products/zeus-series-flood-100w.png" 
                    alt="Outdoor Lighting" 
                    fallbackSrc="/images/backgrounds/hero-warehouse.jpg" 
                  />
                  <div className="category-card-content">
                    <h3 className="category-card-title">Outdoor Lighting</h3>
                    <span className="category-card-count">Durable outdoor solutions</span>
                  </div>
                </Link>
              </ScrollReveal>
              
              <ScrollReveal direction="up" delay={0.3}>
                <Link href="/products#decorative-lighting" className="category-card">
                  <ImageWithFallback 
                    src="/images/products/led-strip-light.jpg" 
                    alt="Decorative Lighting" 
                    fallbackSrc="/images/backgrounds/hero-warehouse.jpg" 
                  />
                  <div className="category-card-content">
                    <h3 className="category-card-title">Decorative Lighting</h3>
                    <span className="category-card-count">Elegant accents</span>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/products" className="btn btn-outline">
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="section section-dark">
          <ScrollReveal direction="up" className="container" style={{ textAlign: 'center' }}>
            <h2 className="section-title">Ready to Upgrade Your Lighting?</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 2rem' }}>
              Download our latest catalog or get in touch with our team to discuss your project requirements.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/downloads" className="btn btn-primary">Download Catalog</Link>
              <Link href="/contact" className="btn btn-white">Contact Us</Link>
            </div>
          </ScrollReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
