import s from './Footer.module.scss'
export default function Footer() {
    
    return (
        <footer className={s.footer}>
        <span className={s.span}>
          © Developped by{' '}
          <a
            href="https://github.com/doomys1234"
            className={s.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            Maksym Rydenko
          </a>
        </span>
      </footer>
    )
}