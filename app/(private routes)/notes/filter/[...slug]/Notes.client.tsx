'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import css from './NotesPage.module.css';

interface Props {
  initialData: FetchNotesResponse;
  tag: string;
}

export default function Notes({ initialData, tag }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(search, 300);

  const { data } = useQuery({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes({ search: debouncedSearch, page, tag }),
    placeholderData: keepPreviousData,
    initialData: debouncedSearch === '' && page === 1 ? initialData : undefined,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearch} />
        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} onChange={setPage} />}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
