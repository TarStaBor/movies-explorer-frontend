import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import profile from "../../images/profile.svg";
import Burger from "../Burger/Burger";
import PopupBurger from "../PopupBurger/PopupBurger";
import { LARGE } from "../../utils/constants";

function Navigation() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= LARGE);
  const [isOpen, setIsOpen] = React.useState(false);

  const setActive = ({ isActive }) =>
    isActive ? "navigation__link link-opacity navigation__link_active" : "navigation__link link-opacity";

  function openBurger() {
    setIsOpen(true);
  }

  const updateWidth = React.useCallback(() => {
    const newWidth = window.innerWidth <= LARGE;
    if (newWidth !== isMobile) {
      setIsMobile(newWidth);
    }
  }, [isMobile]);

  // Слушаем и обновляем ширину экрана
  React.useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  function closeAllPopups() {
    setIsOpen(false);
  }

  return (
    <>
      {isMobile ? (
        <>
          <Burger openBurger={openBurger} />
          <PopupBurger isOpen={isOpen} onClose={closeAllPopups} />
        </>
      ) : (
        <section className="navigation">
          <div className="navigation__links">
            <NavLink to="/movies" className={setActive}>
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setActive}>
              Сохраненные фильмы{" "}
            </NavLink>
          </div>
          <NavLink to="/profile" className="navigation__profile link-opacity">
            <img src={profile} alt="Изображение кнопки 'Аккаунт'"></img>
          </NavLink>
        </section>
      )}
    </>
  );
}

export default Navigation;
