import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { MeetingSearch } from '@/components/MeetingSearch';
import MeetingCard from '@/components/MeetingCard';
import { Pagination } from '@/components/Pagination';

// 1. Agregamos "async" aquí
export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  // 2. Agregamos "await" aquí para esperar a la base de datos
  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">All Meetings</h2>
      <MeetingSearch />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meetings.map((m) => (
          <MeetingCard key={m.id} meeting={m} />
        ))}
      </div>
      
      <Pagination totalPages={totalPages} />
    </div>
  );
}