import { useState } from "react";
import "./MoviesCard.css";
import active from "../../images/selecter_active.svg";
import disactive from "../../images/selecter_disactive.svg";
import crossDelete from "../../images/selecter_delete.svg";

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

  const pathName = window.location.pathname;

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

        {pathName === "/saved-movies" ? (
          <button className="moviesCard__selecter moviesCard__selecter_type_delete link-opacity">
            <img src={crossDelete} className="moviesCard__selecter-logo" alt="Логотип удаления из изюранного"></img>
          </button>
        ) : (
          <button
            className={`moviesCard__selecter ${selectActive ? "moviesCard__selecter_type_save" : ""} link-opacity`}
            onClick={saveMovie}
          >
            <img
              src={selectActive ? active : disactive}
              className="moviesCard__selecter-logo"
              alt="Логотип добавления в избранные"
            ></img>
          </button>
        )}
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer">
        <img src={imgUrl} className="moviesCard__picture" alt="Изображение фильма"></img>
      </a>
    </li>
  );
}

export default MoviesCard;
