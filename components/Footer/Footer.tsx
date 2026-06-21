import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.wrap}>
        <p>NoteHub. All rights reserved.</p>
        <p>
          Developer:{' '}
          <a href="https://github.com/YachnikVova" target="_blank" rel="noopener noreferrer">
            Vova Yachnik
          </a>
        </p>
      </div>
    </footer>
  );
}
