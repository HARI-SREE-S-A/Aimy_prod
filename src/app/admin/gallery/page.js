'use client';
import { useState, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';

export default function GalleryManager() {
  const [gallery, setGallery] = useState({ photos: [], videos: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('photos');
  
  const [editingIdx, setEditingIdx] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch('/api/cms/gallery/');
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveGallery = async (newGallery) => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/gallery/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGallery),
      });
      if (res.ok) {
        setGallery(newGallery);
        setEditingIdx(null);
      } else {
        alert('Failed to save — are you logged in?');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddPhoto = () => {
    const newItem = { category: 'New Category', slug: 'new-category', images: [] };
    const updated = { ...gallery, photos: [newItem, ...gallery.photos] };
    setGallery(updated);
    setEditingIdx(0);
    setEditForm(newItem);
  };

  const handleAddVideo = () => {
    const newItem = { category: 'New Category', slug: 'new-category', videos: [] };
    const updated = { ...gallery, videos: [newItem, ...gallery.videos] };
    setGallery(updated);
    setEditingIdx(0);
    setEditForm(newItem);
  };

  const handleSave = () => {
    const key = activeTab;
    const newList = [...gallery[key]];
    newList[editingIdx] = editForm;
    saveGallery({ ...gallery, [key]: newList });
  };

  const handleDelete = (idx) => {
    if (!confirm('Delete this entry?')) return;
    const key = activeTab;
    const newList = gallery[key].filter((_, i) => i !== idx);
    saveGallery({ ...gallery, [key]: newList });
  };

  if (loading) return <div>Loading gallery...</div>;

  const items = gallery[activeTab] || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Gallery & Feeds</h1>
        <button 
          onClick={activeTab === 'photos' ? handleAddPhoto : handleAddVideo}
          style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Add {activeTab === 'photos' ? 'Photo Category' : 'Video Category'}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '5px', marginBottom: '25px' }}>
        {['photos', 'videos'].map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setEditingIdx(null); }}
            style={{
              padding: '10px 25px',
              background: activeTab === tab ? '#E31E24' : '#222',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 600 : 400,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'photos' ? '📸 Photos' : '🎬 Videos'} ({(gallery[tab] || []).length})
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: 'grid', gap: '15px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
            {editingIdx === idx ? (
              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Category Name</label>
                    <input 
                      type="text" value={editForm.category || ''} placeholder="Category"
                      onChange={e => setEditForm({...editForm, category: e.target.value})}
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>URL Slug</label>
                    <input 
                      type="text" value={editForm.slug || ''} placeholder="slug"
                      onChange={e => setEditForm({...editForm, slug: e.target.value})}
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                </div>

                {activeTab === 'photos' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>📷 Upload Photos</label>
                    <FileUploader 
                      subDir="gallery"
                      accept="image/*"
                      multiple={true}
                      maxFiles={20}
                      onUpload={(files) => {
                        const newPaths = files.map(f => f.path);
                        setEditForm(prev => ({ ...prev, images: [...(prev.images || []), ...newPaths] }));
                      }}
                    />
                    {/* Current images list */}
                    {editForm.images && editForm.images.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>{editForm.images.length} image(s):</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {editForm.images.map((img, i) => (
                            <div key={i} style={{ position: 'relative' }}>
                              <img 
                                src={img.startsWith('/') ? img : `/images/gallery/${img}`} 
                                alt={`Photo ${i}`} 
                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #333' }} 
                              />
                              <button 
                                onClick={() => setEditForm(prev => ({ ...prev, images: prev.images.filter((_, j) => j !== i) }))}
                                style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', borderRadius: '50%', background: '#E31E24', color: '#fff', border: 'none', fontSize: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              >×</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Manual image input */}
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '4px' }}>Or add image paths manually (comma-separated)</label>
                      <input 
                        type="text" value={(editForm.images || []).join(', ')} placeholder="image1.jpg, image2.jpg"
                        onChange={e => setEditForm({...editForm, images: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                        style={{ width: '100%', padding: '8px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px', fontSize: '0.85rem' }} 
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'videos' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>🎬 Upload Videos</label>
                    <FileUploader 
                      subDir="feeds"
                      accept="video/*"
                      multiple={true}
                      maxFiles={5}
                      onUpload={(files) => {
                        const newPaths = files.map(f => f.path);
                        setEditForm(prev => ({ ...prev, videos: [...(prev.videos || []), ...newPaths] }));
                      }}
                    />
                    {/* Current videos list */}
                    {editForm.videos && editForm.videos.length > 0 && (
                      <div style={{ marginTop: '10px' }}>
                        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '6px' }}>{editForm.videos.length} video(s):</div>
                        {editForm.videos.map((vid, i) => (
                          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.85rem', color: '#ccc' }}>🎥 {vid}</span>
                            <button 
                              onClick={() => setEditForm(prev => ({ ...prev, videos: prev.videos.filter((_, j) => j !== i) }))}
                              style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#E31E24', color: '#fff', border: 'none', fontSize: '0.6rem', cursor: 'pointer' }}
                            >×</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* Manual video URL/embed input */}
                    <div style={{ marginTop: '10px' }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginBottom: '4px' }}>Or paste YouTube/Vimeo embed URLs (one per line)</label>
                      <textarea 
                        value={(editForm.videos || []).join('\n')} placeholder="https://youtube.com/embed/..."
                        onChange={e => setEditForm({...editForm, videos: e.target.value.split('\n').map(s => s.trim()).filter(Boolean)})}
                        rows={3}
                        style={{ width: '100%', padding: '8px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px', fontSize: '0.85rem', resize: 'vertical' }} 
                      />
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={handleSave} disabled={saving} style={{ padding: '8px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => setEditingIdx(null)} style={{ padding: '8px 20px', background: 'transparent', color: '#ccc', border: '1px solid #444', borderRadius: '5px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{item.category}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    Slug: /{item.slug}
                    {item.images && <span> • {item.images.length} image{item.images.length !== 1 ? 's' : ''}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => { setEditingIdx(idx); setEditForm(item); }} style={{ padding: '6px 15px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(idx)} style={{ padding: '6px 15px', background: 'transparent', color: '#E31E24', border: '1px solid #444', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666', background: '#111', borderRadius: '10px' }}>
            No {activeTab} yet. Click the button above to add one.
          </div>
        )}
      </div>
    </div>
  );
}
