import "./NavTab.css";

function NavTab() {
  return (
    <section className="navTab">
      <a href="#aboutProject" className="navTab__link link-opacity">
        О проекте
      </a>
      <a href="#techs" className="navTab__link link-opacity">
        Технологии
      </a>
      <a href="#aboutMe" className="navTab__link link-opacity">
        Студент
      </a>
    </section>
  );
}

export default NavTab;
