import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchNoteById } from '@/lib/api/serverApi';
import css from './NoteDetails.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 100),
  };
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <main className={css.main}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
          <Link href="/notes/filter/All" className={css.backBtn}>
            Back
          </Link>
        </div>
      </div>
    </main>
  );
}
