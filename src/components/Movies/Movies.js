import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import More from "../More/More";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const { loggedIn, handlePreloader, isPreloader, cards } = props;

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isPreloader ? <Preloader handlePreloader={handlePreloader} /> : ""}
      <SearchForm handlePreloader={handlePreloader} />
      <MoviesCardList cards={cards} />
      <More />
      <Footer />
    </>
  );
}

export default Movies;
