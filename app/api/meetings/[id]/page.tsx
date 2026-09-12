import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MeetingDetailPage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings/${params.id}`, { cache: 'no-store' });
  
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