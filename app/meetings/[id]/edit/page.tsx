import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteMeetingAction } from '@/lib/actions';

export default async function MeetingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const deleteMeetingWithId = deleteMeetingAction.bind(null, meetingId);

  return (
    <main className="max-w-2xl mx-auto p-4">
      <Link href="/meetings" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Meetings
      </Link>
      
      <div className="flex gap-4 mb-6">
        <Link 
          href={`/meetings/${id}/edit`} 
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Edit Meeting
        </Link>
        <form action={deleteMeetingWithId}>
          <button 
            type="submit" 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete Meeting
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 border border-gray-200">
        <div className="border-b pb-4">
          <h3 className="text-2xl font-bold text-gray-800">Sacrament Meeting Details</h3>
          <p className="text-gray-500 text-sm mt-1">Date: {meeting.date}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Meeting Type:</p>
            <p className="text-gray-600 capitalize">{String(meeting.meetingType || '')}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Presiding Authority:</p>
            <p className="text-gray-600">{String(meeting.presiding || 'N/A')}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Conducting Authority:</p>
            <p className="text-gray-600">{String(meeting.conducting || 'N/A')}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Announcements:</p>
            <p className="text-gray-600">{Array.isArray(meeting.announcements) ? meeting.announcements.join(', ') : String(meeting.announcements || 'None')}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <h4 className="font-bold text-gray-800">Program & Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <p><span className="font-semibold">Opening Hymn:</span> {String(meeting.openingHymn || 'N/A')}</p>
            <p><span className="font-semibold">Opening Prayer:</span> {String(meeting.openingPrayer || 'N/A')}</p>
            <p><span className="font-semibold">Sacrament Hymn:</span> {String(meeting.sacramentHymn || 'N/A')}</p>
            <p><span className="font-semibold">Closing Hymn:</span> {String(meeting.closingHymn || 'N/A')}</p>
            <p><span className="font-semibold">Closing Prayer:</span> {String(meeting.closingPrayer || 'N/A')}</p>
          </div>
        </div>
      </div>
    </main>
  );
}