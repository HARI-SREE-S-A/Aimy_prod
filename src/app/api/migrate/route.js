import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

const dataDir = path.join(process.cwd(), 'src', 'data');

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db('aimy_db');
    
    const collectionsToMigrate = [
      'products',
      'gallery',
      'pages',
      'siteSettings',
      'careers'
    ];
    
    const results = [];
    
    for (const coll of collectionsToMigrate) {
      try {
        const filePath = path.join(dataDir, `${coll}.json`);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        
        await db.collection('cms_data').updateOne(
          { _id: coll },
          { $set: { data: data, updatedAt: new Date(), migrated: true } },
          { upsert: true }
        );
        
        results.push({ collection: coll, status: 'success' });
      } catch (err) {
        if (err.code === 'ENOENT') {
          results.push({ collection: coll, status: 'skipped (not found)' });
        } else {
          results.push({ collection: coll, status: `error: ${err.message}` });
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Migration complete',
      results
    });
    
  } catch (error) {
    console.error('Migration Error:', error);
    return NextResponse.json({ error: 'Failed to run migration', details: error.message }, { status: 500 });
  }
}
