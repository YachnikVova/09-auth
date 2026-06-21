import { fetchNoteById } from '@/lib/api/serverApi';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewModal({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modal>
      <NotePreview note={note} />
    </Modal>
  );
}
