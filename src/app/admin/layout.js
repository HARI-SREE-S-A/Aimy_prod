import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import LogoutButton from './LogoutButton'; // We'll create this

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  
  if (token !== 'authenticated_aimy_admin') {
    // If someone tries to guess the /admin URL, kick them out
    redirect('/');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'var(--font-poppins)' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', background: '#111', borderRight: '1px solid #333', padding: '30px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 30px 30px', borderBottom: '1px solid #222', marginBottom: '20px' }}>
          <img src="/images/brand/logo.png" alt="Aimy India" style={{ height: '30px', marginBottom: '15px' }} />
          <h2 style={{ fontSize: '1rem', color: '#888', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>Executive CMS</h2>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 15px', flex: 1 }}>
          <Link href="/admin" style={{ padding: '12px 15px', color: '#fff', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            Dashboard
          </Link>
          <Link href="/admin/products" style={{ padding: '12px 15px', color: '#ccc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            📦 Products Catalog
          </Link>
          <Link href="/admin/gallery" style={{ padding: '12px 15px', color: '#ccc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            📸 Gallery & Feeds
          </Link>
          <Link href="/admin/careers" style={{ padding: '12px 15px', color: '#ccc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            💼 Careers & Jobs
          </Link>
        </nav>
        
        <div style={{ padding: '20px 30px', borderTop: '1px solid #222' }}>
          <a href="/" target="_blank" style={{ display: 'block', padding: '12px', background: '#222', color: '#fff', textAlign: 'center', borderRadius: '8px', textDecoration: 'none', marginBottom: '10px', fontSize: '0.9rem' }}>
            View Live Site ↗
          </a>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px 60px', overflowY: 'auto', background: '#050505' }}>
        {process.env.VERCEL && (
          <div style={{
            background: 'rgba(212, 168, 83, 0.1)',
            borderLeft: '4px solid #D4A853',
            padding: '15px 20px',
            marginBottom: '30px',
            borderRadius: '0 8px 8px 0'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#D4A853' }}>⚠️ Vercel Free Tier Notice</h4>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
              Because this app is hosted on Vercel, the filesystem is <b>read-only</b>. Any changes made here (like new products, photos, or uploads) will reset when the serverless function restarts. To make permanent changes, use the admin panel locally and push via Git. Uploads are limited to 4MB.
            </p>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
