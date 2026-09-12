import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params and headers in Next.js 16!
  const { id } = await params;
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  
  const res = await fetch(`${protocol}://${host}/api/meetings/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    notFound();
  }

  const meeting: SacramentMeeting = await res.json();

  return (
    <div>
      <Link href="/meetings" className="text-blue-600 hover:underline mb-6 inline-block print:hidden">
        &larr; Back to Meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}