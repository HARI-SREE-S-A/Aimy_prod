import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'News Feeds | Aimy India',
  description: 'Latest news, updates, and articles from Aimy India.',
};

async function getPosts() {
  try {
    const { data } = await supabase
      .from('posts')
      .select('id, title, slug, excerpt, category, created_at, featured_image')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    return data || [];
  } catch (error) {
    return [];
  }
}

export default async function NewsFeedsPage() {
  const posts = await getPosts();
  
  // Fallback data if DB is empty or not connected
  const displayPosts = posts.length > 0 ? posts : [
    {
      id: 'fb1',
      title: 'Youth Day Celebration',
      slug: 'youth-day',
      excerpt: 'Aimy India celebrates Youth Day and wishes all the young minds a very happy and energetic Youth Day.',
      category: 'Celebration',
      created_at: '2022-08-12T00:00:00.000Z',
      featured_image: '/images/products/whatsapp-image-2022-07-09-at-5.49.11-pm.jpeg'
    },
    {
      id: 'fb2',
      title: 'Diwali – Festival of Lights',
      slug: 'diwali',
      excerpt: 'Wishing you all a very happy and prosperous Diwali! May this festival of lights bring joy and prosperity to your homes.',
      category: 'Celebration',
      created_at: '2022-10-24T00:00:00.000Z',
      featured_image: '/images/products/whatsapp-image-2022-07-29-at-4.09.06-pm.jpeg'
    },
    {
      id: 'fb3',
      title: 'Happy New Year Wishes',
      slug: 'happy-new-year',
      excerpt: 'Aimy India wishes you all a very Happy New Year! Let us make this year filled with light, hope, and new beginnings.',
      category: 'Celebration',
      created_at: '2023-01-01T00:00:00.000Z',
      featured_image: '/images/products/whatsapp-image-2022-08-26-at-11.21.18-am.jpeg'
    },
    {
      id: 'fb4',
      title: 'National Science Day',
      slug: 'national-science-day',
      excerpt: 'Aimy India celebrates National Science Day, honoring the discovery of the Raman Effect and the contributions of science in our daily lives.',
      category: 'Announcement',
      created_at: '2023-02-28T00:00:00.000Z',
      featured_image: '/images/products/whatsapp-image-2022-08-30-at-4.51.28-am-1.jpeg'
    }
  ];

  return (
    <>
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <a href="/about/">About</a>
              <span className="separator">/</span>
              <span className="current">News Feeds</span>
            </div>
            <h1>News & Updates</h1>
            <p>Stay up to date with the latest from Aimy India.</p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {displayPosts.map((post) => (
                <Link href={`/news-feeds/${post.slug}`} key={post.id} className="card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                  {post.featured_image && (
                    <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: '#eee' }}>
                      <img 
                        src={post.featured_image} 
                        alt={post.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      <span style={{ color: '#E31E24', fontWeight: 'bold' }}>{post.category || 'Uncategorized'}</span>
                      <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4, color: '#1a1a1a' }}>{post.title}</h3>
                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>{post.excerpt}</p>
                    <div style={{ marginTop: '1.5rem', color: '#1E88E5', fontSize: '0.9rem', fontWeight: '600' }}>
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
