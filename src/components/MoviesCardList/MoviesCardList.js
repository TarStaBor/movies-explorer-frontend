import "./MoviesCardList.css";
import More from "../More/More";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useState, useEffect } from "react";

function MoviesCardList(props) {
  const {
    tumbler,
    filterCards,
    saveCards,
    handleSaveFilm,
    handleDeleteFilm,
    amountShowCards,
    setAmountShowCards,
    addShowCards,
  } = props;

  const [moreButton, setMoreButton] = useState(true);

  // Эффект отображения кнопки "Еще"
  useEffect(() => {
    if (filterCards.length <= amountShowCards) {
      setMoreButton(false);
    } else {
      setMoreButton(true);
    }
  }, [filterCards, amountShowCards]);

  // Фильтрация по состоянию тумблера
  // eslint-disable-next-line array-callback-return
  let tumblerFilteredArray = filterCards.filter((card) => {
    if (!tumbler || (tumbler && card.duration <= 40)) {
      return card;
    }
  });

  return (
    <>
      <section className="moviesCardList">
        {tumblerFilteredArray.length === 0 && <p className="moviesCardList__emptyFilter">НИЧЕГО НЕ НАЙДЕНО</p>}
        <ul className="moviesCardList__container">
          {tumblerFilteredArray.slice(0, amountShowCards).map((card) => {
            return (
              <MoviesCard
                key={card._id}
                card={card}
                handleSaveFilm={handleSaveFilm}
                handleDeleteFilm={handleDeleteFilm}
                saveCards={saveCards}
              />
            );
          })}
        </ul>
      </section>
      {moreButton && (
        <More setAmountShowCards={setAmountShowCards} amountShowCards={amountShowCards} addShowCards={addShowCards} />
      )}
    </>
  );
}

export default MoviesCardList;
