'use client';
import { useState, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/siteSettings');
      if (!res.ok) throw new Error('Failed to load site settings');
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/siteSettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      alert('Site settings saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key, val) => {
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  if (loading) return <div>Loading settings...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  const imageFields = [
    { key: 'headerLogo', label: 'Header Logo', description: 'Main logo shown in the navigation bar.' },
    { key: 'footerLogo', label: 'Footer Logo', description: 'Logo shown at the bottom of the site.' },
    { key: 'makeInIndiaLogo', label: 'Make in India Badge', description: 'Badge shown in the footer.' },
    { key: 'aboutHeroImage', label: 'About Us Hero Image', description: 'Background image on the top of the About page.' },
    { key: 'indoorLightingCategory', label: 'Indoor Lighting Cover', description: 'Category image on the homepage.' },
    { key: 'outdoorLightingCategory', label: 'Outdoor Lighting Cover', description: 'Category image on the homepage.' },
    { key: 'decorativeLightingCategory', label: 'Decorative Lighting Cover', description: 'Category image on the homepage.' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Site Settings</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {imageFields.map(field => (
          <div key={field.key} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
            <h3 style={{ margin: '0 0 5px 0' }}>{field.label}</h3>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '15px' }}>{field.description}</p>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <div style={{ width: '150px', height: '100px', background: '#050505', border: '1px solid #222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '5px' }}>
                {settings[field.key] ? (
                  <img src={settings[field.key]} alt={field.label} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#444' }}>No Image</span>
                )}
              </div>
              
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  value={settings[field.key] || ''} 
                  onChange={e => updateSetting(field.key, e.target.value)}
                  placeholder="/uploads/brand/logo.png"
                  style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px', marginBottom: '10px' }} 
                />
                <FileUploader 
                  subDir="brand"
                  accept="image/*"
                  multiple={false}
                  maxFiles={1}
                  onUpload={(files) => {
                    if (files.length > 0) {
                      updateSetting(field.key, files[0].path);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
