import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/Context";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { ProtectedRoute } from "../HOC/ProtectedRoute";
import * as MainApi from "../../utils/MainApi";
import api from "../../utils/MoviesApi";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import {
  LARGE,
  MEDIUM,
  AmountShowCardsAtLarge,
  AmountShowCardsAtMedium,
  AmountShowCardsAtShort,
  AddShowCardsAtLarge,
  AddShowCardsAtMedium,
} from "../../utils/constants";

function App() {
  // BeatFilm cards
  const [cards, setCards] = useState([]);
  // Our cards
  const [saveCards, setSaveCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [filterCards, setFilterCards] = useState([]);
  const [filterSavedCards, setFilterSavedCards] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [successEditProfile, setSuccessEditProfile] = useState(false);
  const [moviesInputValue, setMoviesInputValue] = useState("");
  const [savedMoviesInputValue, setSavedMoviesInputValue] = useState("");
  const [blockInput, setBlockInput] = useState(false);
  const [moviesTumbler, setMoviesTumbler] = useState(false);
  const [savedMoviesTumbler, setSavedMoviesTumbler] = useState(false);
  const [successSearch, setSuccessSearch] = useState(false);

  const navigate = useNavigate();

  const [amountShowCards, setAmountShowCards] = useState(
    window.innerWidth > LARGE
      ? AmountShowCardsAtLarge
      : window.innerWidth > MEDIUM
      ? AmountShowCardsAtMedium
      : AmountShowCardsAtShort
  );

  const [addShowCards, setAddShowCards] = useState(
    window.innerWidth > LARGE ? AddShowCardsAtLarge : AddShowCardsAtMedium
  );

  useEffect(() => {
    setFilterCards(JSON.parse(localStorage.getItem("filterCards")));
    setMoviesTumbler(JSON.parse(localStorage.getItem("moviesTumbler")));
    setSavedMoviesTumbler(JSON.parse(localStorage.getItem("savedMoviesTumbler")));
    setMoviesInputValue(JSON.parse(localStorage.getItem("moviesInputValue")));
  }, []);

  useEffect(() => {
    savedMoviesInputValue.length === 0 && setSuccessSearch(false);
  }, [savedMoviesInputValue]);

  useEffect(() => {
    localStorage.setItem("moviesTumbler", JSON.stringify(moviesTumbler));
  }, [moviesTumbler]);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo(localStorage.token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      MainApi.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  // Request BeatFilms Movies
  useEffect(() => {
    api
      .getListCard()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Request our films
  useEffect(() => {
    MainApi.getFilms()
      .then((cards) => {
        setSaveCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleloggedOutClick(evt) {
    evt.preventDefault();
    localStorage.removeItem("filterCards");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("moviesInputValue");
    localStorage.removeItem("savedMoviesInputValue");
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/", { replace: false });
  }

  function handleSaveFilm(card) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.saveFilm(card)
      .then((res) => {
        setSaveCards([...saveCards, res]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  function handleDeleteFilm(card) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.deleteFilm(card)
      .then(() => {
        setSaveCards(saveCards.filter((saveCard) => saveCard._id !== card._id));
        setFilterSavedCards(saveCards.filter((saveCard) => saveCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  function registration(name, email, password) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.register(name, email, password)
      .then((res) => {
        if (email === res.email) {
          authorization(email, password);
          navigate("/movies", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  function authorization(email, password) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate("/movies", { replace: false });
        }
      })
      .catch((err) => {
        setErrorMesage(err.message);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  function handleUpdateUser(name, email) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.patchUserInfo(name, email)
      .then((response) => {
        setCurrentUser(response);
        setErrorMesage("");
        setEditProfile(false);
        setSuccessEditProfile(true);
      })
      .catch((err) => {
        setErrorMesage(err.message);
        setEditProfile(true);
        setSuccessEditProfile(false);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  // Filtering BeatFilms movies
  function handleMoviesFilter(arrayforSearch) {
    const newArray = arrayforSearch.filter((card) => {
      if (card.nameRU.toLowerCase().includes(moviesInputValue)) {
        return card;
      }
    });
    localStorage.setItem("filterCards", JSON.stringify(newArray));
    setFilterCards(JSON.parse(localStorage.getItem("filterCards")));
    localStorage.setItem("moviesInputValue", JSON.stringify(moviesInputValue));
    localStorage.setItem("moviesTumbler", JSON.stringify(moviesTumbler));
  }

  // Filtering selected movies
  function handleSavedMoviesFilter(arrayforSearch) {
    const newArray = arrayforSearch.filter((card) => {
      if (card.nameRU.toLowerCase().includes(savedMoviesInputValue)) {
        return card;
      }
    });
    savedMoviesInputValue.length === 0 ? setSuccessSearch(false) : setSuccessSearch(true);
    setFilterSavedCards(newArray);
  }

  window.onresize = () => {
    if (window.innerWidth > LARGE) {
      setAddShowCards(AddShowCardsAtLarge);
    } else {
      setAddShowCards(AddShowCardsAtMedium);
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <section className="root">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  handleFilter={handleMoviesFilter}
                  setMoviesInputValue={setMoviesInputValue}
                  handleDeleteFilm={handleDeleteFilm}
                  handleSaveFilm={handleSaveFilm}
                  setAmountShowCards={setAmountShowCards}
                  setTumbler={setMoviesTumbler}
                  tumbler={moviesTumbler}
                  filterCards={filterCards}
                  amountShowCards={amountShowCards}
                  addShowCards={addShowCards}
                  saveCards={saveCards}
                  loggedIn={loggedIn}
                  isPreloader={preloader}
                  cards={cards}
                  searchValue={moviesInputValue}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                  handleFilter={handleSavedMoviesFilter}
                  setSavedMoviesInputValue={setSavedMoviesInputValue}
                  handleDeleteFilm={handleDeleteFilm}
                  handleSaveFilm={handleSaveFilm}
                  setAmountShowCards={setAmountShowCards}
                  setTumbler={setSavedMoviesTumbler}
                  filterSavedCards={filterSavedCards}
                  tumbler={savedMoviesTumbler}
                  amountShowCards={amountShowCards}
                  addShowCards={addShowCards}
                  saveCards={saveCards}
                  loggedIn={loggedIn}
                  isPreloader={preloader}
                  searchValue={savedMoviesInputValue}
                  successSearch={successSearch}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                  setEditProfile={setEditProfile}
                  handleUpdateUser={handleUpdateUser}
                  handleloggedOutClick={handleloggedOutClick}
                  setSuccessEditProfile={setSuccessEditProfile}
                  editProfile={editProfile}
                  errorMesage={errorMesage}
                  loggedIn={loggedIn}
                  isPreloader={preloader}
                  blockInput={blockInput}
                  successEditProfile={successEditProfile}
                />
              </ProtectedRoute>
            }
          />
          {loggedIn ? (
            <Route path="/signin" element={<Navigate replace to="/movies" />} />
          ) : (
            <Route
              exact
              path="/signin"
              element={
                <Login
                  errorMesage={errorMesage}
                  handleSubmit={authorization}
                  isPreloader={preloader}
                  blockInput={blockInput}
                />
              }
            />
          )}
          {loggedIn ? (
            <Route path="/signup" element={<Navigate replace to="/movies" />} />
          ) : (
            <Route
              exact
              path="/signup"
              element={
                <Register
                  errorMesage={errorMesage}
                  handleSubmit={registration}
                  isPreloader={preloader}
                  blockInput={blockInput}
                />
              }
            />
          )}
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
