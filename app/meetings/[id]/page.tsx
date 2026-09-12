import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Await params for Next.js 16 compatibility
  const { id } = await params;
  
  // Call the mock database directly instead of using fetch()
  const meeting = getMeetingById(parseInt(id, 10));
  
  if (!meeting) {
    notFound();
  }

  return (
    <div>
      <Link href="/meetings" className="text-blue-600 hover:underline mb-6 inline-block print:hidden">
        &larr; Back to Meetings
      </Link>
      <MeetingDetail meeting={meeting} />
    </div>
  );
}