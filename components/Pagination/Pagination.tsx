'use client';

import css from './Pagination.module.css';

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((current) => (
        <li key={current} className={current === page ? css.active : undefined}>
          <a onClick={() => onChange(current)}>{current}</a>
        </li>
      ))}
    </ul>
  );
}
