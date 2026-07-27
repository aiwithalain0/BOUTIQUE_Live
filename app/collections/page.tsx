import { Suspense } from 'react';
import CollectionsClient from './CollectionsClient';

export const dynamic = 'force-dynamic';

export default async function CollectionsPage(props: {
  searchParams: Promise<{ category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const initialCategory = searchParams.category || '';

  return (
    <Suspense fallback={<div className="pt-32 text-center text-[#EEEEEE] py-20 bg-[#222831]">Loading boutique catalog...</div>}>
      <CollectionsClient initialCategory={initialCategory} />
    </Suspense>
  );
}
