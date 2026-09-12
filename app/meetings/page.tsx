import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function MeetingsPage() {
  // Dynamically get the exact host URL (localhost or Vercel)
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  
  const res = await fetch(`${protocol}://${host}/api/meetings`, { cache: 'no-store' });
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