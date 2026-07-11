import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export const metadata = {
  title: 'Admin Dashboard | Aimy India',
};

async function getCount(filename) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    const raw = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.length : Object.keys(data).length;
  } catch { return 0; }
}

export default async function AdminDashboard() {
  const productCount = await getCount('products.json');
  const careerCount = await getCount('careers.json');
  const galleryRaw = JSON.parse(await fs.readFile(path.join(process.cwd(), 'src', 'data', 'gallery.json'), 'utf8').catch(() => '{"photos":[],"videos":[]}'));
  const galleryCount = (galleryRaw.photos?.length || 0) + (galleryRaw.videos?.length || 0);

  const cards = [
    { title: 'Products', count: productCount, icon: '📦', href: '/admin/products/', color: '#E31E24' },
    { title: 'Gallery & Feeds', count: galleryCount, icon: '📸', href: '/admin/gallery/', color: '#1E88E5' },
    { title: 'Careers', count: careerCount, icon: '💼', href: '/admin/careers/', color: '#D4A853' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#fff' }}>Dashboard</h1>
      <p style={{ color: '#888', marginBottom: '40px', fontSize: '1rem' }}>Welcome to the Aimy India Executive CMS</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {cards.map(card => (
          <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111',
              padding: '30px',
              borderRadius: '12px',
              border: '1px solid #333',
              transition: 'border-color 0.2s, transform 0.2s',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1rem', color: '#888', margin: '0 0 8px 0' }}>{card.title}</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: card.color, marginBottom: '10px' }}>{card.count}</div>
              <span style={{ color: '#666', fontSize: '0.85rem' }}>Manage →</span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>Quick Guide</h2>
        <p style={{ color: '#888', lineHeight: 1.7, marginBottom: '15px' }}>
          This CMS lets you manage all the dynamic content on the Aimy India website. Changes you make here are saved instantly to your server and will appear on the live site on the next page load.
        </p>
        <div style={{ padding: '15px', background: '#0a0a0a', borderLeft: '4px solid #E31E24', borderRadius: '0 8px 8px 0' }}>
          <strong style={{ color: '#fff' }}>How to access this panel:</strong>
          <span style={{ color: '#888' }}> Type <code style={{ color: '#E31E24', background: '#1a1a1a', padding: '2px 6px', borderRadius: '3px' }}>admin</code> on any page of the site to open the login overlay.</span>
        </div>
      </div>
    </div>
  );
}
