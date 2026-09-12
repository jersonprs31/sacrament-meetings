import type { SacramentMeeting } from '@/lib/types';

export default function MeetingDetail({ meeting }: { meeting: SacramentMeeting }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow border max-w-2xl mx-auto text-gray-800 print:shadow-none print:border-none">
      <h2 className="text-3xl font-bold text-center mb-1">Sacrament Meeting</h2>
      <p className="text-center text-gray-500 mb-8">{meeting.date} • {meeting.meetingType}</p>

      <div className="space-y-4 mb-8 text-lg">
        <p><strong>Presiding:</strong> {meeting.presiding}</p>
        <p><strong>Conducting:</strong> {meeting.conducting}</p>
      </div>

      <div className="space-y-6">
        {meeting.announcements && meeting.announcements.length > 0 && (
          <section>
            <h3 className="font-bold border-b pb-1 mb-2">Announcements</h3>
            <ul className="list-disc pl-5">
              {meeting.announcements.map((ann, i) => <li key={i}>{ann}</li>)}
            </ul>
          </section>
        )}

        <section className="grid grid-cols-1 gap-2">
          <p><strong>Opening Hymn:</strong> #{meeting.openingHymn.number} - {meeting.openingHymn.title}</p>
          <p><strong>Invocation:</strong> {meeting.openingPrayer}</p>
        </section>

        {meeting.wardBusiness.length > 0 && (
          <section>
            <h3 className="font-bold border-b pb-1 mb-2">Ward Business</h3>
            <ul className="list-disc pl-5">
              {meeting.wardBusiness.map((biz, i) => <li key={i}>{biz.description}</li>)}
            </ul>
          </section>
        )}

        <section>
          <p><strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} - {meeting.sacramentHymn.title}</p>
          <p className="text-sm text-gray-500 italic mt-1">Administration of the Sacrament</p>
        </section>

        <section>
          <h3 className="font-bold border-b pb-1 mb-2">Speakers & Music</h3>
          <ul className="space-y-3">
            {meeting.speakers.map((speaker, i) => (
              <li key={i}>
                <span className="font-semibold">{speaker.name}</span>
                {speaker.topic && <span className="text-gray-600"> — {speaker.topic}</span>}
                <span className="text-xs ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{speaker.type}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid grid-cols-1 gap-2 border-t pt-4">
          <p><strong>Closing Hymn:</strong> #{meeting.closingHymn.number} - {meeting.closingHymn.title}</p>
          <p><strong>Benediction:</strong> {meeting.closingPrayer}</p>
        </section>
      </div>
      
      <button onClick={() => window.print()} className="mt-8 bg-blue-600 text-white px-4 py-2 rounded print:hidden w-full">
        Print Program
      </button>
    </div>
  );
}