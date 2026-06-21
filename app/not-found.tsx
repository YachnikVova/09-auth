import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found — NoteHub',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </main>
  );
}
