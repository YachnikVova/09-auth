'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/clientApi';
import type { NoteTag } from '@/types/note';
import { TAGS } from '@/lib/tags';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/All');
    },
  });

  const handleSubmit = (formData: FormData) => {
    mutation.mutate({
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" className={css.input} required />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} className={css.textarea} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} defaultValue="Todo" required>
          {TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={() => router.back()}>
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
