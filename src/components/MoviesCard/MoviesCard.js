import { useState, useEffect } from "react";
import "./MoviesCard.css";
import active from "../../images/selecter_active.svg";
import disactive from "../../images/selecter_disactive.svg";
import crossDelete from "../../images/selecter_delete.svg";

function MoviesCard(props) {
  const { card, handleSaveFilm, handleDeleteFilm, saveCards } = props;
  const duration = prepareDuration(card.duration);
  const pathName = window.location.pathname;
  const imgUrl = pathName === "/movies" ? "https://api.nomoreparties.co" + card.image.url : card.image;

  //Стейт лайка карточки
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    saveCards.map((saveCard) => {
      if (saveCard.movieId === card.id) {
        setIsLike(true);
      }
    });
  }, [saveCards]);

  // function setAllCards
  function prepareDuration(minutes) {
    if (minutes > 60) {
      return ((minutes / 60) | 0) + "ч " + (minutes % 60) + "м";
    } else if (minutes === 60) {
      return ((minutes / 60) | 0) + "ч ";
    } else {
      return minutes + " мин";
    }
  }

  return (
    <li className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__info">
          <h2 className="moviesCard__title">{card.nameRU}</h2>
          <h3 className="moviesCard__subtitle">{duration}</h3>
        </div>

        {pathName === "/saved-movies" ? (
          <button
            className="moviesCard__selecter moviesCard__selecter_type_delete link-opacity"
            onClick={() => {
              handleDeleteFilm(card);
            }}
          >
            <img src={crossDelete} className="moviesCard__selecter-logo" alt="Логотип удаления из изюранного"></img>
          </button>
        ) : (
          <button
            className={`moviesCard__selecter ${isLike === true && "moviesCard__selecter_type_save"} link-opacity`}
            onClick={() => {
              if (isLike) {
                handleDeleteFilm(saveCards.find((saveCard) => saveCard.movieId === card.id));
              } else {
                handleSaveFilm(card);
              }
              setIsLike(!isLike);
            }}
          >
            <img
              src={isLike ? active : disactive}
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
