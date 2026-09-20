import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 16 compatibility
  const { id } = await params;

  // Add the "await" keyword here since getMeetingById now queries the live database
  const meeting = await getMeetingById(parseInt(id, 10));

  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <Link href="/meetings" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}