import "./PopupBurger.css";
import exitButton from "../../images/exit-button.svg";
import { NavLink, Link } from "react-router-dom";
import profile from "../../images/profile.svg";

function PopupBurger(props) {
  const { isOpen, onClose } = props;

  const setActive = ({ isActive }) =>
    isActive ? "popupBurger__link link-opacity popupBurger__link_active" : "popupBurger__link link-opacity";

  return (
    <section className={`popupBurger ${isOpen ? "popupBurger_opened" : ""}`}>
      <img
        src={exitButton}
        className="popupBurger_exit-button link-opacity"
        onClick={onClose}
        alt="Кнопка 'Выйти'"
      ></img>
      <div className="popupBurger__container">
        <div className="popupBurger__links">
          <NavLink to="/" className={setActive}>
            Главная
          </NavLink>
          <NavLink to="/movies" className={setActive}>
            Фильмы
          </NavLink>
          <NavLink to="/saved-movies" className={setActive}>
            Сохраненные фильмы{" "}
          </NavLink>
        </div>
        <Link to="/profile" className="popupBurger__profile link-opacity">
          <img src={profile} alt="Изображение кнопки 'Аккаунт'"></img>
        </Link>
      </div>
    </section>
  );
}

export default PopupBurger;
