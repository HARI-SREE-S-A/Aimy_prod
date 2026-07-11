import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const isAuthenticated = (request) => {
  const token = request.cookies.get('admin_token')?.value;
  return token === 'authenticated_aimy_admin';
};

export async function GET(request, { params }) {
  const { collection } = await params;
  
  try {
    const client = await clientPromise;
    const db = client.db('aimy_db');
    
    // We treat the MongoDB collection 'cms_data' as our generic store.
    // Each document has _id = collection_name (e.g., 'products', 'pages').
    const doc = await db.collection('cms_data').findOne({ _id: collection });
    
    if (doc && doc.data) {
      return NextResponse.json(doc.data);
    } else {
      // Return empty structure based on collection type if not found.
      const fallback = (collection === 'pages' || collection === 'siteSettings' || collection === 'gallery') ? {} : [];
      return NextResponse.json(fallback);
    }
  } catch (error) {
    console.error('MongoDB GET Error:', error);
    return NextResponse.json({ error: 'Failed to read data from database' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection } = await params;
  
  try {
    const newData = await request.json();
    const client = await clientPromise;
    const db = client.db('aimy_db');
    
    // Upsert the entire JSON block into the document.
    await db.collection('cms_data').updateOne(
      { _id: collection },
      { $set: { data: newData, updatedAt: new Date() } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, message: 'Data saved to MongoDB successfully' });
  } catch (error) {
    console.error('MongoDB POST Error:', error);
    return NextResponse.json({ error: 'Failed to save data to database' }, { status: 500 });
  }
}
