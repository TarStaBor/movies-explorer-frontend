import { useState } from "react";
import "./MoviesCard.css";
import active from "../../images/selecter_active.svg";
import disactive from "../../images/selecter_disactive.svg";
import picture from "../../images/picture.jpg";

function MoviesCard() {
  const [selectActive, setSelectActive] = useState(false);

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
      <img src={picture} className="moviesCard__picture" alt="Изображение фильма"></img>
    </section>
  );
}

export default MoviesCard;
