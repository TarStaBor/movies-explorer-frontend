import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const { cards } = props;
  return (
    <section className="moviesCardList">
      <ul className="moviesCardList__container">
        {cards.map((card) => {
          return (
            <MoviesCard
              key={card._id}
              card={card}
              // onCardClick={onCardClick}
              // onCardLike={onCardLike}
              // onCardDelete={onCardDelete}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
