import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { commitToGitHub } from '@/lib/github';

// On Vercel, the filesystem is read-only except for /tmp.
// We write to /tmp locally just so the API succeeds, but the real persistence
// happens via the GitHub commit which triggers a Vercel rebuild.
const UPLOAD_DIR = process.env.NODE_ENV === 'production'
  ? '/tmp/uploads'
  : path.join(process.cwd(), 'public', 'uploads');

const isAuthenticated = (request) => {
  const token = request.cookies.get('admin_token')?.value;
  return token === 'authenticated_aimy_admin';
};

// Ensure upload directory exists
async function ensureUploadDir(subDir = '') {
  const dir = subDir ? path.join(UPLOAD_DIR, subDir) : UPLOAD_DIR;
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  return dir;
}

export async function POST(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    const subDir = formData.get('subDir') || ''; // e.g. 'products', 'gallery', 'feeds'
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Sanitize subDir to prevent path traversal
    const safeSubDir = subDir.replace(/[^a-zA-Z0-9_-]/g, '');
    const uploadDir = await ensureUploadDir(safeSubDir);

    const uploaded = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
        'video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        continue; // skip unsupported files silently
      }

      // Limit file size (4MB for Vercel free tier)
      if (file.size > 4 * 1024 * 1024) {
        continue;
      }

      // Generate safe filename: timestamp + sanitized original name
      const ext = path.extname(file.name) || '';
      const baseName = path.basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .substring(0, 60);
      const timestamp = Date.now();
      const fileName = `${baseName}-${timestamp}${ext}`;
      
      const filePath = path.join(uploadDir, fileName);
      
      // Write file to disk
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.writeFile(filePath, buffer);
      
      // Build the public URL path
      const publicPath = safeSubDir 
        ? `/uploads/${safeSubDir}/${fileName}`
        : `/uploads/${fileName}`;

      // Commit to GitHub (Vercel redeploys automatically)
      const gitPath = safeSubDir 
        ? `public/uploads/${safeSubDir}/${fileName}`
        : `public/uploads/${fileName}`;
      const commitMsg = `CMS Upload: Added ${fileName}`;
      commitToGitHub(gitPath, buffer, commitMsg, true).catch(err => console.error('GitHub Upload Error:', err));
      
      uploaded.push({
        name: file.name,
        fileName,
        path: publicPath,
        size: file.size,
        type: file.type,
      });
    }

    if (uploaded.length === 0) {
      return NextResponse.json({ 
        error: 'No valid files uploaded. Allowed: images (jpg, png, gif, webp, svg) and videos (mp4, webm, ogg, mov). Max 4MB (Vercel Limit).' 
      }, { status: 400 });
    }

    let warning = '';
    if (process.env.VERCEL) {
      warning = ' (Note: Uploads on Vercel Free Tier will not persist after function restarts)';
    }

    return NextResponse.json({ 
      success: true, 
      files: uploaded,
      message: `${uploaded.length} file(s) uploaded successfully${warning}`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed: ' + error.message }, { status: 500 });
  }
}

// GET: List uploaded files
export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const subDir = (searchParams.get('subDir') || '').replace(/[^a-zA-Z0-9_-]/g, '');
    const dir = subDir ? path.join(UPLOAD_DIR, subDir) : UPLOAD_DIR;

    try {
      await fs.access(dir);
    } catch {
      return NextResponse.json({ files: [] });
    }

    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const stat = await fs.stat(path.join(dir, entry.name));
      const publicPath = subDir 
        ? `/uploads/${subDir}/${entry.name}`
        : `/uploads/${entry.name}`;
      
      files.push({
        name: entry.name,
        path: publicPath,
        size: stat.size,
        modified: stat.mtime,
      });
    }

    // Sort newest first
    files.sort((a, b) => new Date(b.modified) - new Date(a.modified));

    return NextResponse.json({ files });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
