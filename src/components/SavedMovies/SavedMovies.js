import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const {
    handleFilter,
    setSavedMoviesInputValue,
    handleDeleteFilm,
    handleSaveFilm,
    setAmountShowCards,
    setTumbler,
    filterSavedCards,
    tumbler,
    amountShowCards,
    addShowCards,
    saveCards,
    loggedIn,
    isPreloader,
    searchValue,
    successSearch,
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
      {saveCards && (
        <MoviesCardList
          tumbler={tumbler}
          filterCards={successSearch ? filterSavedCards : saveCards}
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
