import "./AboutProject.css";

function AboutProject() {
  return (
    <section id="aboutProject" className="aboutProject">
      <div className="aboutProject__container">
        <div className="aboutProject__title-box">
          <h2 className="aboutProject__title">О проекте</h2>
        </div>

        <ul className="aboutProject__description">
          <li className="aboutProject__card">
            <h3 className="aboutProject__card-title">Дипломный проект включал 5 этапов</h3>
            <p className="aboutProject__card-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </li>
          <li className="aboutProject__card">
            <h3 className="aboutProject__card-title">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutProject__card-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>

        <div className="aboutProject__bar">
          <div className="aboutProject__backend-bar">
            <div className="aboutProject__backend-bar-title">
              <h3 className="aboutProject__backend-title">1 неделя</h3>
            </div>
            <p className="aboutProject__subtitle">Back&#8209;end</p>
          </div>
          <div className="aboutProject__frontend-bar">
            <div className="aboutProject__frontend-bar-title">
              <h3 className="aboutProject__frontend-title">4 недели</h3>
            </div>
            <p className="aboutProject__subtitle">Front&#8209;end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
