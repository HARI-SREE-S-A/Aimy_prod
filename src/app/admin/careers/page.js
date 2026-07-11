'use client';
import { useState, useEffect } from 'react';

export default function CareersManager() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const res = await fetch('/api/cms/careers');
      if (res.ok) {
        const data = await res.json();
        setCareers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveCareers = async (newCareers) => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCareers),
      });
      if (res.ok) {
        setCareers(newCareers);
        setEditingId(null);
      }
    } catch (err) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNew = () => {
    const newCareer = {
      id: Date.now().toString(),
      title: 'New Position',
      location: 'Kochi, Kerala',
      type: 'Full-time',
      description: 'Role description...'
    };
    setCareers([newCareer, ...careers]);
    setEditingId(newCareer.id);
    setEditForm(newCareer);
  };

  const handleSave = () => {
    const newCareers = careers.map(c => c.id === editingId ? editForm : c);
    saveCareers(newCareers);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this posting?')) {
      saveCareers(careers.filter(c => c.id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Careers & Jobs</h1>
        <button 
          onClick={handleAddNew}
          style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Post Job
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {careers.map(career => (
          <div key={career.id} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
            
            {editingId === career.id ? (
              <div style={{ display: 'grid', gap: '10px' }}>
                <input 
                  type="text" 
                  value={editForm.title} 
                  placeholder="Job Title"
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                  style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff' }} 
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input 
                    type="text" 
                    value={editForm.location} 
                    placeholder="Location"
                    onChange={e => setEditForm({...editForm, location: e.target.value})}
                    style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff' }} 
                  />
                  <input 
                    type="text" 
                    value={editForm.type} 
                    placeholder="Type (e.g. Full-time)"
                    onChange={e => setEditForm({...editForm, type: e.target.value})}
                    style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff' }} 
                  />
                </div>
                <textarea 
                  value={editForm.description} 
                  placeholder="Job Description"
                  rows="4"
                  onChange={e => setEditForm({...editForm, description: e.target.value})}
                  style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', resize: 'vertical' }} 
                />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={handleSave} disabled={saving} style={{ padding: '8px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    {saving ? 'Saving...' : 'Save Posting'}
                  </button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '8px 20px', background: 'transparent', color: '#ccc', border: '1px solid #444', borderRadius: '5px' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{career.title}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#888' }}>
                    {career.location} • {career.type}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setEditingId(career.id); setEditForm(career); }} style={{ padding: '6px 15px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px' }}>Edit</button>
                  <button onClick={() => handleDelete(career.id)} style={{ padding: '6px 15px', background: 'transparent', color: '#E31E24', border: '1px solid #444', borderRadius: '5px' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}