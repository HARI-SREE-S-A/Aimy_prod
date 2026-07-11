'use client';
import { useState, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Quick editor state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/cms/products');
      if (!res.ok) throw new Error('Failed to load products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveProducts = async (newProducts) => {
    setSaving(true);
    try {
      const res = await fetch('/api/cms/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProducts),
      });
      if (!res.ok) throw new Error('Unauthorized or failed to save');
      setProducts(newProducts);
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id);
    setEditForm(prod);
  };

  const handleSave = () => {
    const newProducts = products.map(p => p.id === editingId ? editForm : p);
    saveProducts(newProducts);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const newProducts = products.filter(p => p.id !== id);
      saveProducts(newProducts);
    }
  };

  const handleAddNew = () => {
    const newProd = {
      id: Date.now().toString(),
      slug: 'new-product',
      name: 'New Product',
      categoryGroup: 'Indoor Lighting',
      image_url: '',
      gallery: [],
      models: []
    };
    setProducts([newProd, ...products]);
    handleEdit(newProd);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Products Catalog</h1>
        <button 
          onClick={handleAddNew}
          style={{ padding: '10px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
        >
          + Add Product
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {products.map(product => (
          <div key={product.id} style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
            
            {editingId === product.id ? (
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Product Name</label>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>URL Slug</label>
                    <input 
                      type="text" 
                      value={editForm.slug} 
                      onChange={e => setEditForm({...editForm, slug: e.target.value})}
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Category</label>
                    <input 
                      type="text" 
                      value={editForm.categoryGroup} 
                      onChange={e => setEditForm({...editForm, categoryGroup: e.target.value})}
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '5px' }}>Image URL (or upload below)</label>
                    <input 
                      type="text" 
                      value={editForm.image_url || ''} 
                      onChange={e => setEditForm({...editForm, image_url: e.target.value})}
                      placeholder="/uploads/products/my-image.jpg"
                      style={{ width: '100%', padding: '10px', background: '#050505', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} 
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>📷 Upload Product Image</label>
                  <FileUploader 
                    subDir="products"
                    accept="image/*"
                    multiple={false}
                    maxFiles={1}
                    onUpload={(files) => {
                      if (files.length > 0) {
                        setEditForm(prev => ({ ...prev, image_url: files[0].path }));
                      }
                    }}
                  />
                  {editForm.image_url && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={editForm.image_url} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #333' }} />
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>{editForm.image_url}</span>
                    </div>
                  )}
                </div>

                {/* Gallery Images Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#888', marginBottom: '8px' }}>🖼️ Upload Gallery Images (multiple)</label>
                  <FileUploader 
                    subDir="products"
                    accept="image/*"
                    multiple={true}
                    maxFiles={10}
                    onUpload={(files) => {
                      const newPaths = files.map(f => f.path);
                      setEditForm(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...newPaths] }));
                    }}
                  />
                  {editForm.gallery && editForm.gallery.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {editForm.gallery.map((img, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                          <img src={img} alt={`Gallery ${i}`} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #333' }} />
                          <button 
                            onClick={() => setEditForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, j) => j !== i) }))}
                            style={{ position: 'absolute', top: '-4px', right: '-4px', width: '16px', height: '16px', borderRadius: '50%', background: '#E31E24', color: '#fff', border: 'none', fontSize: '0.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Models & Specifications */}
                <div style={{ marginTop: '10px', padding: '15px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 15px 0' }}>Models & Specifications</h4>
                  {(editForm.models || []).map((model, mIndex) => (
                    <div key={mIndex} style={{ marginBottom: '15px', padding: '15px', background: '#111', border: '1px solid #222', borderRadius: '5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <strong style={{ fontSize: '0.9rem' }}>Model Variant {mIndex + 1}</strong>
                        <button onClick={() => {
                          const newModels = [...editForm.models];
                          newModels.splice(mIndex, 1);
                          setEditForm({...editForm, models: newModels});
                        }} style={{ color: '#E31E24', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#888' }}>Model Code</label>
                          <input placeholder="e.g. Z-101" value={model.modelCode || ''} onChange={e => {
                            const newModels = [...editForm.models];
                            newModels[mIndex].modelCode = e.target.value;
                            setEditForm({...editForm, models: newModels});
                          }} style={{ width: '100%', padding: '8px', background: '#050505', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#888' }}>Wattage</label>
                          <input placeholder="e.g. 10W" value={model.wattage || ''} onChange={e => {
                            const newModels = [...editForm.models];
                            newModels[mIndex].wattage = e.target.value;
                            setEditForm({...editForm, models: newModels});
                          }} style={{ width: '100%', padding: '8px', background: '#050505', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.7rem', color: '#888' }}>Warranty</label>
                          <input placeholder="e.g. 2 Years" value={model.warranty || ''} onChange={e => {
                            const newModels = [...editForm.models];
                            newModels[mIndex].warranty = e.target.value;
                            setEditForm({...editForm, models: newModels});
                          }} style={{ width: '100%', padding: '8px', background: '#050505', color: '#fff', border: '1px solid #333', borderRadius: '4px' }} />
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.7rem', color: '#888' }}>Technical Specifications (JSON format)</label>
                        <textarea 
                          placeholder='{"Electrical Data": {"Voltage": "220V", "PF": ">0.9"}}'
                          defaultValue={JSON.stringify(model.specs || {}, null, 2)}
                          onBlur={e => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              const newModels = [...editForm.models];
                              newModels[mIndex].specs = parsed;
                              setEditForm({...editForm, models: newModels});
                            } catch (err) {
                              alert('Invalid JSON format in Specs. Please fix it before saving.');
                            }
                          }}
                          style={{ width: '100%', height: '120px', padding: '8px', background: '#050505', color: '#fff', border: '1px solid #333', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.8rem' }}
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newModels = [...(editForm.models || []), { modelCode: '', wattage: '', warranty: '', specs: {} }];
                    setEditForm({...editForm, models: newModels});
                  }} style={{ padding: '6px 15px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Model</button>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={handleSave} disabled={saving} style={{ padding: '8px 20px', background: '#E31E24', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button onClick={() => setEditingId(null)} style={{ padding: '8px 20px', background: 'transparent', color: '#ccc', border: '1px solid #444', borderRadius: '5px', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ width: '50px', height: '50px', background: '#222', borderRadius: '5px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {product.image_url ? <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '🖼️'}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{product.name}</h3>
                    <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: '#888' }}>
                      <span>Category: {product.categoryGroup}</span>
                      <span>Slug: /{product.slug}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(product)} style={{ padding: '6px 15px', background: '#222', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ padding: '6px 15px', background: 'transparent', color: '#E31E24', border: '1px solid #444', borderRadius: '5px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
