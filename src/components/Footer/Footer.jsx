import { useLocation } from "react-router-dom";

function Footer() {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  return (
    (currentPath === "/" ||
      currentPath === "/movies" ||
      currentPath === "/saved-movies") && (
      <footer className="footer">
        <h2 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className="footer__container">
          <p className="footer__copyright">© 2024</p>
          <div className="footer__links">
            <a
              className="footer__link"
              href="https://github.com/dmitrmeln"
              target="_blank"
              rel="noopener noreferrer"
            >
              Яндекс.Практикум
            </a>
            <a
              className="footer__link"
              href="https://github.com/dmitrmeln"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
