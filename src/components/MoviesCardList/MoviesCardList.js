import "./MoviesCardList.css";
import More from "../More/More";
import MoviesCard from "../MoviesCard/MoviesCard";
import { SHORT } from "../../utils/constants";

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

  let tumblerFilteredArray = filterCards.filter((card) => {
    if (!tumbler || (tumbler && card.duration <= SHORT)) {
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
                key={card.id}
                card={card}
                handleSaveFilm={handleSaveFilm}
                handleDeleteFilm={handleDeleteFilm}
                saveCards={saveCards}
              />
            );
          })}
        </ul>
      </section>
      {amountShowCards <= tumblerFilteredArray.length && (
        <More setAmountShowCards={setAmountShowCards} amountShowCards={amountShowCards} addShowCards={addShowCards} />
      )}
    </>
  );
}

export default MoviesCardList;
