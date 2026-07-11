'use client';

import { useState, useRef, useCallback } from 'react';

/**
 * Drag-and-drop file uploader with preview.
 * 
 * Props:
 * - subDir: string — subdirectory under /uploads/ (e.g. 'products', 'gallery')
 * - accept: string — file input accept attribute (default: 'image/*,video/*')
 * - multiple: boolean — allow multiple files (default: true)
 * - onUpload: (files: UploadedFile[]) => void — callback with uploaded file info
 * - maxFiles: number — max files per upload (default: 10)
 */
export default function FileUploader({ 
  subDir = '', 
  accept = 'image/*,video/*', 
  multiple = true, 
  onUpload, 
  maxFiles = 10 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState('');
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const uploadFiles = useCallback(async (files) => {
    if (!files || files.length === 0) return;
    
    const fileList = Array.from(files).slice(0, maxFiles);
    setError('');
    setUploading(true);
    setProgress(`Uploading ${fileList.length} file(s)...`);

    // Generate previews
    const newPreviews = fileList.map(file => ({
      name: file.name,
      type: file.type,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      isVideo: file.type.startsWith('video/'),
    }));
    setPreviews(newPreviews);

    const formData = new FormData();
    fileList.forEach(file => formData.append('files', file));
    if (subDir) formData.append('subDir', subDir);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Upload failed');
        setProgress('');
        return;
      }

      setProgress(`✅ ${data.files.length} file(s) uploaded successfully!`);
      
      if (onUpload) {
        onUpload(data.files);
      }

      // Clear previews after a delay
      setTimeout(() => {
        setPreviews([]);
        setProgress('');
      }, 3000);

    } catch (err) {
      setError('Network error — please try again');
      setProgress('');
    } finally {
      setUploading(false);
    }
  }, [subDir, maxFiles, onUpload]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  }, [uploadFiles]);

  const handleFileSelect = useCallback((e) => {
    uploadFiles(e.target.files);
    e.target.value = ''; // reset so the same file can be re-selected
  }, [uploadFiles]);

  return (
    <div style={{ marginBottom: '15px' }}>
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? '#E31E24' : '#444'}`,
          borderRadius: '12px',
          padding: '30px 20px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'rgba(227, 30, 36, 0.08)' : '#0a0a0a',
          transition: 'all 0.2s ease',
          position: 'relative',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
        
        <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>
          {uploading ? '⏳' : isDragging ? '📂' : '📁'}
        </div>
        <div style={{ color: '#ccc', fontSize: '0.95rem', fontWeight: 500 }}>
          {uploading 
            ? progress 
            : isDragging 
              ? 'Drop files here!' 
              : 'Drag & drop files here, or click to browse'}
        </div>
        <div style={{ color: '#666', fontSize: '0.8rem', marginTop: '6px' }}>
          Supports: JPG, PNG, GIF, WebP, SVG, MP4, WebM, MOV • Max 4MB per file (Vercel Limit)
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ 
          color: '#E31E24', 
          fontSize: '0.85rem', 
          marginTop: '8px', 
          padding: '8px 12px', 
          background: 'rgba(227,30,36,0.1)', 
          borderRadius: '6px' 
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
          gap: '10px', 
          marginTop: '12px' 
        }}>
          {previews.map((preview, i) => (
            <div key={i} style={{ 
              borderRadius: '8px', 
              overflow: 'hidden', 
              background: '#111', 
              border: '1px solid #333',
              aspectRatio: '1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {preview.url ? (
                <img 
                  src={preview.url} 
                  alt={preview.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : preview.isVideo ? (
                <div style={{ fontSize: '2rem' }}>🎬</div>
              ) : (
                <div style={{ fontSize: '2rem' }}>📄</div>
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '4px 6px',
                background: 'rgba(0,0,0,0.7)',
                fontSize: '0.65rem',
                color: '#ccc',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {preview.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
