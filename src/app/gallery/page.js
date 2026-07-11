import { getCollectionData } from '@/lib/data';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Gallery | Aimy India',
  description: 'Glimpses of our events, projects, and celebrations.',
};

export default async function GalleryPage() {
  const galleryData = await getCollectionData('gallery', { photos: [] });
  const siteSettings = await getCollectionData('siteSettings', {});

  return <GalleryClient galleryData={galleryData} siteSettings={siteSettings} />;
}
