import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <div className="footer__container">
        <div className="footer__box">
          <h2 className="footer__box-title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        </div>
        <div className="footer__information">
          <h2 className="footer__year">&#169; 2022</h2>
          <div className="footer__links">
            <a
              href="https://practicum.yandex.ru/web/"
              target="_blank"
              rel="noreferrer"
              className="footer__link link-opacity"
            >
              Яндекс.Практикум
            </a>
            <a
              href="https://github.com/TarStaBor"
              target="_blank"
              rel="noreferrer"
              className="footer__link link-opacity"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/stanislav-tarasov-11b428191/"
              target="_blank"
              rel="noreferrer"
              className="footer__link link-opacity"
            >
              LinkedIn
            </a>
            <a href="https://vk.com/id2292680" target="_blank" rel="noreferrer" className="footer__link link-opacity">
              Vkontakte
            </a>
            <a href="https://t.me/COHuK" target="_blank" rel="noreferrer" className="footer__link link-opacity">
              Telegram
            </a>
            <a
              href="https://www.instagram.com/oloe_stase/"
              target="_blank"
              rel="noreferrer"
              className="footer__link link-opacity"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
