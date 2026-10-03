import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const meeting = await getMeetingById(parseInt(id, 10));

  if (!meeting) {
    return {
      title: 'Meeting Not Found',
    };
  }

  return {
    title: `Meeting: ${meeting.date}`,
    description: `Sacrament meeting on ${meeting.date}. Presiding: ${meeting.presiding}.`,
    openGraph: {
      title: `Meeting: ${meeting.date}`,
      description: `Sacrament meeting on ${meeting.date}. Presiding: ${meeting.presiding}.`,
    },
  };
}

export default async function MeetingDetailPage({ params }: Props) {
  const { id } = await params;
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