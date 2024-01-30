import linkArrow from "../../images/link-arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__links">
        <a
          className="portfolio__link"
          href="https://github.com/dmitrmeln"
          target="_blank"
          rel="noopener noreferrer">
          Статичный сайт
          <img className="portfolio__link-icon" src={linkArrow} alt="иконка ссылки"></img>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/dmitrmeln"
          target="_blank"
          rel="noopener noreferrer">
          Адаптивный сайт
          <img className="portfolio__link-icon" src={linkArrow} alt="иконка ссылки"></img>
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/dmitrmeln"
          target="_blank"
          rel="noopener noreferrer">
          Одностраничное приложение
          <img className="portfolio__link-icon" src={linkArrow} alt="иконка ссылки"></img>
        </a>
      </div> 
    </section>
  );
}

export default Portfolio;
