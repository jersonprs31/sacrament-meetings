import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';

export default async function MeetingsPage() {
  // Fetching absolute URL to fulfill API route requirement
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/meetings`, { cache: 'no-store' });
  const meetings: SacramentMeeting[] = await res.json();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">All Meetings</h2>
        <Link href="/meetings/current" className="text-blue-600 hover:underline font-medium">
          Jump to Current Sunday &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}