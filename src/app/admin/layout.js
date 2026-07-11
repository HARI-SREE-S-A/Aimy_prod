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
          <Link href="/admin/pages" style={{ padding: '12px 15px', color: '#ccc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            📝 Static Pages
          </Link>
          <Link href="/admin/settings" style={{ padding: '12px 15px', color: '#ccc', textDecoration: 'none', borderRadius: '8px', transition: 'background 0.2s' }}>
            ⚙️ Site Settings
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
        {children}
      </main>
    </div>
  );
}
