import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductSpecTable from '@/components/ProductSpecTable';
import ImageWithFallback from '@/components/ImageWithFallback';
import products from '@/data/products.json';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return { title: 'Product Not Found | Aimy India' };
  }
  
  return {
    title: `${product.name} | Aimy India`,
    description: `Detailed specifications and models for ${product.name}`,
  };
}

// Generate static params for all products since they come from a static JSON file
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  // Get common top-level features
  const features = [];
  if (product.models && product.models.length > 0) {
    const m = product.models[0];
    if (m.warranty) features.push({ icon: '🛡️', text: `${m.warranty} Warranty` });
    if (m.shapes) features.push({ icon: '📐', text: m.shapes });
    if (m.specs?.['<strong>ELECTRICAL DATA</strong>']?.['Input Voltage']) {
       features.push({ icon: '⚡', text: m.specs['<strong>ELECTRICAL DATA</strong>']['Input Voltage'] });
    }
    if (m.specs?.['<strong>MECHANICAL DATA</strong>']?.['Material']) {
       features.push({ icon: '🏭', text: m.specs['<strong>MECHANICAL DATA</strong>']['Material'] });
    }
  }

  return (
    <>
      <Header />
      
      <main>
        <section className="page-header" style={{ paddingBottom: '3rem' }}>
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <a href="/products">Products</a>
              <span className="separator">/</span>
              <span className="current">{product.name}</span>
            </div>
          </div>
        </section>

        <section className="section" style={{ paddingTop: '2rem' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
              
              {/* Product Image Gallery */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: '#f5f5f5', borderRadius: '16px', padding: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <ImageWithFallback 
                    src={product.gallery && product.gallery.length > 0 ? product.gallery[0] : `/images/products/${product.slug}.jpg`} 
                    alt={product.name} 
                    style={{ width: '100%', maxWidth: '400px', height: 'auto', mixBlendMode: 'multiply' }}
                    fallbackSrc="/images/backgrounds/hero-warehouse.jpg"
                    fallbackStyle={{ mixBlendMode: 'normal', borderRadius: '10px' }}
                  />
                </div>
                {product.gallery && product.gallery.length > 1 && (
                  <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                    {product.gallery.slice(1).map((imgUrl, idx) => (
                      <div key={idx} style={{ background: '#f5f5f5', borderRadius: '8px', padding: '1rem', minWidth: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <ImageWithFallback 
                          src={imgUrl} 
                          alt={`${product.name} thumbnail ${idx + 1}`} 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                          fallbackSrc="/images/backgrounds/hero-warehouse.jpg"
                          fallbackStyle={{ mixBlendMode: 'normal', borderRadius: '4px' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Overview */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ color: '#E31E24', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                  {product.categoryGroup}
                </div>
                <h1 style={{ fontSize: '3rem', color: '#1a1a1a', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                  {product.name}
                </h1>
                
                <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.7, marginBottom: '2rem' }}>
                  The {product.name} series offers premium performance and reliability. Designed for 
                  efficiency and longevity, these fixtures are ideal for various applications within 
                  the {product.categoryGroup.toLowerCase()} category.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '3rem' }}>
                  {features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem', background: '#f5f5f5', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                        {feature.icon}
                      </span>
                      <span style={{ fontWeight: 500, color: '#333' }}>{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href="#specifications" className="btn btn-primary">View Specifications</a>
                  <a href="/contact" className="btn btn-outline">Enquire Now</a>
                </div>
              </div>
            </div>
            
            {/* Detailed Specifications */}
            <div id="specifications">
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem' }}>
                Technical <span>Specifications</span>
              </h2>
              
              {product.models && product.models.length > 0 ? (
                <ProductSpecTable models={product.models} />
              ) : (
                <div style={{ padding: '2rem', background: '#f9f9f9', borderRadius: '10px', textAlign: 'center', color: '#666' }}>
                  Detailed specifications are not available for this product online. Please contact us for more information.
                </div>
              )}
            </div>
            
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
