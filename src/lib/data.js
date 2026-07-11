import clientPromise from '@/lib/mongodb';

/**
 * Fetches a document from the cms_data MongoDB collection.
 * @param {string} collectionName - e.g. 'pages', 'siteSettings', 'products'
 * @param {any} fallback - The default empty structure to return if not found (e.g. {} or [])
 */
export async function getCollectionData(collectionName, fallback = {}) {
  try {
    const client = await clientPromise;
    const db = client.db('aimy_db');
    const doc = await db.collection('cms_data').findOne({ _id: collectionName });
    
    if (doc && doc.data) {
      return doc.data;
    }
    return fallback;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName} from MongoDB:`, error);
    return fallback;
  }
}
