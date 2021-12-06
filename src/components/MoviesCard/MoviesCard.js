import { useState } from "react";
import "./MoviesCard.css";
import active from "../../images/selecter_active.svg";
import disactive from "../../images/selecter_disactive.svg";

function MoviesCard(props) {
  const { card } = props;
  const imgUrl = "https://api.nomoreparties.co" + card.image.url;

  function prepareDuration(minutes) {
    if (minutes > 60) {
      return ((minutes / 60) | 0) + "ч " + (minutes % 60) + "м";
    } else if ((minutes = 60)) {
      return ((minutes / 60) | 0) + "ч ";
    }
    return minutes + " мин";
  }
  const duration = prepareDuration(card.duration);

  const [selectActive, setSelectActive] = useState(false);

  function saveMovie() {
    if (selectActive === true ? setSelectActive(false) : setSelectActive(true));
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__info">
          <h2 className="moviesCard__title">{card.nameRU}</h2>
          <h3 className="moviesCard__subtitle">{duration}</h3>
        </div>
        <div
          className={`moviesCard__selecter ${selectActive ? "moviesCard__selecter_save" : ""} link-opacity`}
          onClick={saveMovie}
        >
          <img
            src={selectActive ? active : disactive}
            className="moviesCard__selecter-logo"
            alt="Логотип добавления в избранные"
          ></img>
        </div>
      </div>
      <img src={imgUrl} className="moviesCard__picture" alt="Изображение фильма"></img>
    </li>
  );
}

export default MoviesCard;
