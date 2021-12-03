import { Link } from "react-router-dom";
import "./Login.css";
import logo from "../../images/logo.svg";

function Login(props) {
  const { handleloggedInClick } = props;

  return (
    <section className="login">
      <form className="login__form">
        <div className="login__header">
          <Link className="login__link" to="/">
            <img src={logo} className="login__logo link-opacity" alt="Логотип"></img>
          </Link>
          <h2 className="login__title">Рады видеть!</h2>
        </div>
        <div className="login__container">
          <p className="login__text">E-mail</p>
          <input className="login__input" type="email" required value="pochta@yandex.ru" />
          <p className="login__error-text" style={{ visibility: "hidden" }}>
            Что-то пошло не так...
          </p>
          <p className="login__text">Пароль</p>
          <input className="login__input" required type="password" />
          <p className="login__error-text" style={{ visibility: "hidden" }}>
            Что-то пошло не так...
          </p>
        </div>
        <div className="login__submit">
          <button type="submit" className="login__submit-button link-opacity" onClick={handleloggedInClick}>
            Войти
          </button>
          <h2 className="login__reg-question">
            Ещё не зарегистрированы?
            <Link to="/signup" className="login__link link-opacity">
              Регистрация
            </Link>
          </h2>
        </div>
      </form>
    </section>
  );
}

export default Login;
