import "./Portfolio.css";
import Arrow from "../../images/arrow.svg";

function Portfolio() {
  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>

        <a href="https://choicejobs.ru/" target="_blank" rel="noreferrer" className="portfolio__box link-opacity">
          <h2 className="portfolio__box-title">
            Приложение для работы с вакансиями <span className="portfolio__box-span">CHOICE</span>
          </h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>

        <a
          href="https://mesto-frontend.tarstabor.nomoredomains.rocks/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">
            Одностраничное приложение <span className="portfolio__box-span">MESTO</span>
          </h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>

        <a
          href="https://tarstabor.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">
            Адаптивный сайт <span className="portfolio__box-span">RUSSIAN TRAVEL</span>
          </h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>

        <a
          href="https://tarstabor.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
          className="portfolio__box link-opacity"
        >
          <h2 className="portfolio__box-title">
            Статичный сайт <span className="portfolio__box-span">HOW TO LEARN?</span>
          </h2>
          <img src={Arrow} className="portfolio__box-arrow" alt="Изображение стрелки"></img>
        </a>
      </div>
    </section>
  );
}

export default Portfolio;
