import "./Techs.css";

function Techs() {
  return (
    <section id="techs" className="techs">
      <div className="techs__container">
        <div className="techs__title-box">
          <h2 className="techs__title">Технологии</h2>
        </div>
      </div>

      <div className="techs__description">
        <h3 className="techs__description-title">7 технологий</h3>
        <p className="techs__description-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>

      <ul className="techs__technologies">
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">HTML</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">CSS</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">JS</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">React</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">Git</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">Express.js</h2>
        </li>
        <li className="techs__technology link-opacity">
          <h2 className="techs__technology-title">mongoDB</h2>
        </li>
      </ul>
    </section>
  );
}

export default Techs;
