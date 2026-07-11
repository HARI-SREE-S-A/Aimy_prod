import Link from 'next/link';

export const metadata = {
  title: 'Manage News & Blog Posts | Admin Dashboard',
};

export default function Page() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', color: '#1a1a1a' }}>Manage News & Blog Posts</h1>
        <button style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
          + Add New
        </button>
      </div>
      
      <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#666', marginBottom: '20px' }}>Publish news, updates, and articles.</p>
        
        <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '5px', color: '#888' }}>
          Waiting for Supabase connection to display data.
        </div>
      </div>
    </div>
  );
}