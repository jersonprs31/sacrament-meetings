import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

export default function MeetingCard({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <Link href={`/meetings/${meeting.id}`} className="block">
      <div className="bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-xl font-bold text-gray-800">{meeting.date}</h3>
        <p className="text-sm text-blue-600 font-semibold capitalize mb-3">{meeting.meetingType} Meeting</p>
        <p className="text-gray-600"><strong>Presiding:</strong> {meeting.presiding}</p>
        <p className="text-gray-600"><strong>Conducting:</strong> {meeting.conducting}</p>
      </div>
    </Link>
  );
}