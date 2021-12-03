import "./Burger.css";
import burger from "../../images/burger.svg";

function Burger(props) {
  const { openBurger } = props;
  return (
    <section className="burger">
      <img
        src={burger}
        onClick={openBurger}
        className="burger__button link-opacity"
        alt="Изображение кнопки 'Меню'"
      ></img>
    </section>
  );
}

export default Burger;
