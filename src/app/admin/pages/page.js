'use client';
import { useState, useEffect } from 'react';

export default function PagesManager() {
  const [pages, setPages] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/cms/pages');
      if (!res.ok) throw new Error('Failed to load pages data');
      const data = await res.json();
      setPages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pages),
      });
      if (!res.ok) throw new Error('Failed to save pages data');
      alert('Page content saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleContentChange = (key, content) => {
    setPages(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        content
      }
    }));
  };

  if (loading) return <div>Loading pages...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Static Pages Manager</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px' }}>
        {/* Sidebar Navigation */}
        <div style={{ background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333', alignSelf: 'start' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.1rem', color: '#888' }}>Pages</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.keys(pages).map(key => (
              <li key={key}>
                <button
                  onClick={() => setSelectedPage(key)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    textAlign: 'left',
                    background: selectedPage === key ? '#222' : 'transparent',
                    color: selectedPage === key ? '#fff' : '#ccc',
                    border: selectedPage === key ? '1px solid #444' : '1px solid transparent',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  {pages[key].title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Editor Area */}
        <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
          {selectedPage ? (
            <div>
              <h2 style={{ marginTop: 0, marginBottom: '5px' }}>Editing: {pages[selectedPage].title}</h2>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '20px' }}>You can use HTML tags here (e.g., &lt;p&gt;, &lt;strong&gt;, &lt;br&gt;).</p>
              <textarea
                value={pages[selectedPage].content}
                onChange={(e) => handleContentChange(selectedPage, e.target.value)}
                style={{
                  width: '100%',
                  height: '400px',
                  padding: '15px',
                  background: '#050505',
                  color: '#fff',
                  border: '1px solid #333',
                  borderRadius: '5px',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', color: '#666' }}>
              Select a page from the left to edit its content.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
