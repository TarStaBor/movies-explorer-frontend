import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const { loggedIn, handlePreloader, isPreloader, cards } = props;

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isPreloader ? <Preloader handlePreloader={handlePreloader} /> : ""}
      <SearchForm handlePreloader={handlePreloader} />
      <MoviesCardList cards={cards} />
      <Footer />
    </>
  );
}

export default SavedMovies;
