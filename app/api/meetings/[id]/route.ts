import { getMeetingById } from '@/lib/meetings-db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsedId = parseInt(id, 10);
  
  if (isNaN(parsedId)) {
    return Response.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const meeting = getMeetingById(parsedId);
  if (!meeting) {
    return Response.json({ error: 'Meeting not found' }, { status: 404 });
  }

  return Response.json(meeting);
}