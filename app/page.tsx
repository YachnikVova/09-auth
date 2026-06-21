import css from './Home.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NoteHub</h1>
        <p className={css.description}>
          NoteHub is a simple and efficient application designed for managing personal notes. It
          offers a clean and intuitive interface for creating, organizing, and viewing notes.
        </p>
        <p className={css.description}>
          Sign in to start creating your own notes, filter them by tags and keep everything you need
          in one place.
        </p>
      </div>
    </main>
  );
}
