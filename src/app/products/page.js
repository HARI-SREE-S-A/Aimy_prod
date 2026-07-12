import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageWithFallback from '@/components/ImageWithFallback';
import { getCollectionData } from '@/lib/data';

// Map product slugs to actual image filenames that exist in public/images/products/
// Products not in this map will try slug.jpg -> slug.png -> fallback
const PRODUCT_IMAGE_MAP = {
  'flood-lights-series': 'flood-lights_zeus10.jpg',
  'flood-lights-series-2': 'flood-lights_eco100.jpg',
  'flood-lights-hi-lum-series': 'flood-lights_hi-lum_100w.jpg',
  'economical-flood-series': 'economical-series-flood-100w.png',
  'spot-lights': 'spot-lights_atom-2w.jpg',
  'strip-lights': 'led-strip-light.jpg',
  'street-light-series': 'flood-series.jpg',
  'street-light-series-2': 'flood-series-scaled.jpg',
  'street-light-automatic-series': 'flood.jpg',
  'street-light-economic-series': 'flood-1.jpg',
  'economic-pc-street-light': 'flood-series-scaled-copy.jpg',
  'junction-lights-2': 'junction-lights.jpg',
  'mini-surface-lights': 'spot-light.jpg',
  'bulkheads-lights': 'bulb-series.jpg',
  'bulkheads-fixtures': 'bulb-series-scaled.jpg',
  'surface-panel-lights': 'downlight-que-es-y-para-que-se-utiliza.png',
  'surface-light-panels': 'downlight-que-es-y-para-que-se-utiliza.png',
  'wall-lights-up-down-lights': 'spot-light-copy.jpg',
  'economic-wall-lights': 'spot-light-copy.jpg',
  'essentials': 'bulb-series.jpg',
  'essentials-2': 'bulb-series-scaled-copy.jpg',
  'classic': 'bulb-series.jpg',
  'classic-2': 'bulb-series-scaled.jpg',
  'classic-3': 'bulb-series-scaled-copy.jpg',
  'pro-series': 'flood-series.jpg',
  'fixing-mounts': 'spot-lights_atom-1w_round.jpg',
  'accessories': 'led-strip-ppvxkr.jpg',
};

function getProductImage(slug) {
  if (PRODUCT_IMAGE_MAP[slug]) {
    return `/images/products/${PRODUCT_IMAGE_MAP[slug]}`;
  }
  return `/images/products/${slug}.jpg`;
}

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Our Products | Aimy India',
  description: 'Explore our complete range of premium indoor, outdoor, and decorative LED lighting solutions.',
};

export default async function ProductsPage() {
  const siteSettings = await getCollectionData('siteSettings');
  let categories = await getCollectionData('categories', []);
  let products = await getCollectionData('products', []);

  // Ensure data arrays exist
  if (!Array.isArray(categories)) categories = [];
  if (!Array.isArray(products)) products = [];

  // Group products by category
  const groupedProducts = categories.map(cat => ({
    ...cat,
    productsList: products.filter(p => p.categoryGroup === cat.name)
  })).filter(cat => cat.productsList.length > 0);

  return (
    <>
      <Header siteSettings={siteSettings} />
      
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Products</span>
            </div>
            <h1>Our Products</h1>
            <p>Premium LED Lighting Solutions</p>
          </div>
        </section>

        {/* Category Navigation */}
        <section style={{ padding: '2rem 0', background: '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {groupedProducts.map(cat => (
                <a 
                  key={cat.slug} 
                  href={`#${cat.slug}`}
                  style={{ 
                    whiteSpace: 'nowrap', 
                    padding: '0.5rem 1rem', 
                    background: '#fff', 
                    borderRadius: '20px',
                    color: '#333',
                    textDecoration: 'none',
                    fontWeight: 500,
                    border: '1px solid #ddd',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Product Listings by Category */}
        <div style={{ padding: '4rem 0' }}>
          {groupedProducts.map(category => (
            <section key={category.slug} id={category.slug} className="section" style={{ paddingTop: '2rem' }}>
              <div className="container">
                <div style={{ marginBottom: '3rem' }}>
                  <h2 style={{ fontSize: '2rem', color: '#E31E24', marginBottom: '0.5rem' }}>{category.name}</h2>
                  <p style={{ color: '#666', fontSize: '1.1rem' }}>{category.description}</p>
                  <div className="accent-line" style={{ margin: '1rem 0 0' }}></div>
                </div>

                <div className="product-grid">
                  {category.productsList.map(product => (
                    <Link href={`/products/${product.slug}`} key={product.id} className="product-card">
                      <div className="product-card-image">
                        {/* Try to match image name to slug, fallback to category image or generic */}
                        <ImageWithFallback 
                          src={getProductImage(product.slug)} 
                          alt={product.name} 
                          fallbackSrc="/images/backgrounds/hero-warehouse.jpg" 
                        />
                        <div className="product-card-badge">{product.models?.length || 1} Models</div>
                      </div>
                      <div className="product-card-body">
                        <div className="product-card-category">{category.name}</div>
                        <h3 className="product-card-title">{product.name}</h3>
                        <div className="product-card-meta">
                          {product.models && product.models[0] && (
                            <>
                              {product.models[0].wattage && <span>⚡ {product.models[0].wattage}</span>}
                              {product.models[0].warranty && <span>🛡️ {product.models[0].warranty}</span>}
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
    </>
  );
}
