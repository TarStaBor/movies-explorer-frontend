import "./Portfolio.css";
import Arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>

        <a
          href="https://tarstabor.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">Статичный сайт</h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>

        <a
          href="https://tarstabor.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">Адаптивный сайт</h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>
        <a
          href="https://mesto-frontend.tarstabor.nomoredomains.rocks/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">Одностраничное приложение</h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
