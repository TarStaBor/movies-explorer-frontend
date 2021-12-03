import { Link } from "react-router-dom";
import "./Register.css";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <section className="register">
      <form className="register__form">
        <div className="register__header">
          <Link className="register__link" to="/">
            <img src={logo} className="register__logo link-opacity" alt="Логотип"></img>
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
        </div>
        <div className="register__container">
          <p className="register__text">Имя</p>
          <input className="register__input" type="text" required value="Виталий" />
          <p className="register__error-text" style={{ visibility: "hidden" }}>
            Что-то пошло не так...
          </p>

          <p className="register__text">E-mail</p>
          <input className="register__input" type="email" required value="pochta@yandex.ru" />
          <p className="register__error-text" style={{ visibility: "hidden" }}>
            Что-то пошло не так...
          </p>

          <p className="register__text">Пароль</p>
          <input
            className="register__input"
            type="password"
            required
            style={{ color: "#EE3465" }}
            value="••••••••••••••"
          />
          <p className="register__error-text">Что-то пошло не так...</p>
        </div>
        <div className="register__submit">
          <button type="submit" className="register__submit-button link-opacity">
            Зарегистрироваться
          </button>
          <h2 className="register__reg-question">
            Уже зарегистрированы?
            <Link to="/signin" className="register__link link-opacity">
              Войти
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}

export default Register;
