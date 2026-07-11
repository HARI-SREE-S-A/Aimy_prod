import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

// Helper to fetch single post
async function getPost(slug) {
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    return data;
  } catch (error) {
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) {
    return { title: 'Post Not Found | Aimy India' };
  }
  
  return {
    title: `${post.title} | Aimy India`,
    description: post.excerpt || `Read more about ${post.title}`,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  
  // Fallback for demonstration if Supabase is not connected
  // This will only trigger if slug matches our dummy slugs
  let displayPost = post;
  if (!post) {
    if (slug === 'new-outdoor-flood-lights-launch') {
      displayPost = {
        title: 'Aimy India Launches New Range of Outdoor Flood Lights',
        content: '<p>We are thrilled to announce our latest range of energy-efficient LED flood lights designed for extreme durability and maximum brightness in outdoor environments.</p><p>These new models feature advanced IP66 rating for superior water and dust resistance, making them perfect for sports arenas, industrial complexes, and large architectural illumination.</p><p>Contact our sales team today to learn more about pricing and availability.</p>',
        category: 'Product Launch',
        created_at: new Date().toISOString(),
        featured_image: '/images/products/flood-lights-series.jpg'
      };
    } else if (slug === 'importance-of-cri-indoor-lighting') {
      displayPost = {
        title: 'The Importance of CRI in Indoor Lighting',
        content: '<p>Color Rendering Index (CRI) is a crucial factor when choosing indoor lighting. Learn why high CRI lights make your spaces look more natural and vibrant.</p><p>A CRI of 80 or above is generally considered good for most indoor applications, while a CRI of 90 or above is excellent for areas where color accuracy is critical, such as retail stores, art galleries, and photography studios.</p>',
        category: 'Education',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        featured_image: '/images/products/spot-lights.jpg'
      };
    } else {
      notFound();
    }
  }

  return (
    <>
      <Header />
      
      <main>
        <section className="page-header" style={{ paddingBottom: '4rem' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <a href="/news-feeds/">News Feeds</a>
              <span className="separator">/</span>
              <span className="current">{displayPost.category || 'Article'}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', marginTop: '1rem' }}>{displayPost.title}</h1>
            <div style={{ marginTop: '1.5rem', color: '#ccc', fontSize: '0.9rem' }}>
              Published on {new Date(displayPost.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            {displayPost.featured_image && (
              <div style={{ marginBottom: '3rem', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <img 
                  src={displayPost.featured_image} 
                  alt={displayPost.title}
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
            )}
            
            {/* The blog content */}
            <div 
              className="text-content"
              dangerouslySetInnerHTML={{ __html: displayPost.content }}
            />
            
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
              <a href="/news-feeds" className="btn btn-outline btn-sm">← Back to News</a>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#888', alignSelf: 'center' }}>Share:</span>
                <a href="#" className="btn btn-outline btn-sm" style={{ padding: '0.5rem 1rem' }}>FB</a>
                <a href="#" className="btn btn-outline btn-sm" style={{ padding: '0.5rem 1rem' }}>X</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
