import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const {
    filterSavedCards,
    tumbler,
    setTumbler,
    handleFilter,
    setSavedMoviesInputValue,
    amountShowCards,
    setAmountShowCards,
    addShowCards,
    handleDeleteFilm,
    handleSaveFilm,
    saveCards,
    loggedIn,
    isPreloader,
    searchValue,
  } = props;

  return (
    <>
      <Header loggedIn={loggedIn} />
      {isPreloader && <Preloader />}
      <SearchForm
        handleFilter={handleFilter}
        setSearchValue={setSavedMoviesInputValue}
        tumbler={tumbler}
        setTumbler={setTumbler}
        arrayforSearch={saveCards}
        searchValue={searchValue}
      />
      {filterSavedCards && (
        <MoviesCardList
          tumbler={tumbler}
          filterCards={filterSavedCards}
          saveCards={saveCards}
          handleSaveFilm={handleSaveFilm}
          handleDeleteFilm={handleDeleteFilm}
          amountShowCards={amountShowCards}
          setAmountShowCards={setAmountShowCards}
          addShowCards={addShowCards}
        />
      )}

      <Footer />
    </>
  );
}

export default SavedMovies;
