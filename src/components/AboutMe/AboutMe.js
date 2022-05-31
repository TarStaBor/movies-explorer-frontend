import "./AboutMe.css";
import Me from "../../images/Me.jpg";

function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
      <div className="aboutMe__container">
        <div className="aboutMe__title-box">
          <h2 className="aboutMe__title">О себе</h2>
        </div>
      </div>

      <div className="aboutMe__description">
        <div className="aboutMe__info">
          <h2 className="aboutMe__name">Станислав</h2>
          <h3 className="aboutMe__speciality">Фронтенд&#8209;разработчик, 32 года</h3>
          <h4 className="aboutMe__history">
            Я родился и живу в Москве, окончил Московский Государственный Колледж Информатики и Права по специальности
            "Программное обеспечение вычислительной техники и автоматизированных систем". С 2010 года работал в
            нефтегазовой сфере. В начале февраля 2021 года начал проходить 10&#8209;месячные курсы в «Яндекс Практикуме»
            по программе «Веб&#8209;разработчик».
          </h4>
          <div className="aboutMe__links">
            <a
              href="https://github.com/TarStaBor"
              target="_blank"
              rel="noreferrer"
              className="aboutMe__link link-opacity"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/stanislav-tarasov-11b428191/"
              target="_blank"
              rel="noreferrer"
              className="aboutMe__link link-opacity"
            >
              LinkedIn
            </a>
            <a href="https://vk.com/id2292680" target="_blank" rel="noreferrer" className="aboutMe__link link-opacity">
              Vkontakte
            </a>
            <a href="https://t.me/COHuK" target="_blank" rel="noreferrer" className="aboutMe__link link-opacity">
              Telegram
            </a>
            <a
              href="https://www.instagram.com/oloe_stase/"
              target="_blank"
              rel="noreferrer"
              className="aboutMe__link link-opacity"
            >
              Instagram
            </a>
          </div>
        </div>
        <img src={Me} className="aboutMe__foto" alt="Моя фотография"></img>
      </div>
    </section>
  );
}

export default AboutMe;
