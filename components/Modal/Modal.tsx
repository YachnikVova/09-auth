'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './Modal.module.css';

interface Props {
  children: React.ReactNode;
}

export default function Modal({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') router.back();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [router]);

  const handleBackdrop = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) router.back();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
