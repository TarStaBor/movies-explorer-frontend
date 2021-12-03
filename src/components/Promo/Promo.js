import "./Promo.css";
import textLogo from "../../images/text-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__info">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <button className="promo__button link-opacity">
          <a href="https://practicum.yandex.ru/web/" target="_blank" rel="noreferrer" className="promo__link">
            Узнать больше
          </a>
        </button>
      </div>
      <img src={textLogo} className="promo__textLogo" alt="Изображение земли из слов 'WEB'"></img>
    </section>
  );
}

export default Promo;
