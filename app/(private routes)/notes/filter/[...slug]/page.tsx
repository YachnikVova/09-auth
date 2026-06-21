import { fetchNotes } from '@/lib/api/serverApi';
import Notes from './Notes.client';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTagPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'All';
  const initialData = await fetchNotes({ search: '', page: 1, tag });

  return <Notes initialData={initialData} tag={tag} />;
}
