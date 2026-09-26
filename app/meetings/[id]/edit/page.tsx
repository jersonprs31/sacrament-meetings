import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';
import EditMeetingForm from './edit-form';

export default async function EditMeetingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meetingId = parseInt(id, 10);
  
  const meeting = await getMeetingById(meetingId);

  // Si la base de datos no devuelve nada, mostramos la página de error 404
  if (!meeting) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Meeting</h1>
      {/* Pasamos los datos de la reunión al componente del formulario */}
      <EditMeetingForm meeting={meeting} />
    </main>
  );
}