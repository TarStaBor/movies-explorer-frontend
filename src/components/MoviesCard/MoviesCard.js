import { useState, useEffect } from "react";
import "./MoviesCard.css";
import active from "../../images/selecter_active.svg";
import disactive from "../../images/selecter_disactive.svg";
import crossDelete from "../../images/selecter_delete.svg";
import picture from "../../images/picture.jpg";

function MoviesCard() {
  const [selectActive, setSelectActive] = useState(false);

  // function MoviesCard() {
  //   const [isMovies, setIsMovies] = useState(false);
  // }

  const pathName = window.location.pathname;
  // function deleteOrSave() {
  //   if (isMovies === true ? setIsMovies(false) : setIsMovies(true));
  // }

  function saveMovie() {
    if (selectActive === true ? setSelectActive(false) : setSelectActive(true));
  }

  return (
    <section className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__info">
          <h2 className="moviesCard__title">33 слова о дизайне</h2>
          <h3 className="moviesCard__subtitle">1ч 47м</h3>
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
      <img src={picture} className="moviesCard__picture" alt="Изображение фильма"></img>
    </section>
  );
}

export default MoviesCard;
