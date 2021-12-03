import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const { loggedIn, handlePreloader, isPreloader } = props;

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isPreloader ? <Preloader handlePreloader={handlePreloader} /> : ""}
      <SearchForm handlePreloader={handlePreloader} />
      <MoviesCardList />
      <Footer />
    </>
  );
}

export default SavedMovies;
