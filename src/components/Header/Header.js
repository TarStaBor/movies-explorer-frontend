import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header(props) {
  const { loggedIn } = props;
  const pathName = window.location.pathname;

  return (
    <section className={`header ${loggedIn & (pathName !== "/") ? "header_theme_dark" : ""} `}>
      <nav className="header__container">
        <Link className="header__link" to="/">
          <img src={logo} className="header__logo link-opacity" alt="Логотип"></img>
        </Link>

        {loggedIn ? (
          <Navigation />
        ) : (
          <>
            <div className="header__links">
              <Link className="header__link" to="/signup">
                <h2 className="header__link-title link-opacity">Регистрация</h2>
              </Link>
            </div>
            <Link className="header__link" to="/signin">
              <button className="header__button link-opacity">Войти</button>
            </Link>
          </>
        )}
      </nav>
    </section>
  );
}

export default Header;
