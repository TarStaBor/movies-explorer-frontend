import React from "react";
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
  const navigate = useNavigate();

  // Стейт  регистрации
  const [loggedIn, setLoggedIn] = React.useState(true);

  // Стейт актуального пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  // Стейт карточек из BeatFilm
  const [cards, setCards] = React.useState([]);

  // Стейт карточек из нашего API
  const [saveCards, setSaveCards] = React.useState([]);

  // Стейт отфильтрованных карточек
  const [filterCards, setFilterCards] = React.useState([]);

  // Стейт избранных отфильтрованных карточек
  const [filterSavedCards, setFilterSavedCards] = React.useState([]);

  // Стейт прелодера
  const [preloader, setPreloader] = React.useState(false);

  // Стейт сообщения с ошибкой при обращении к MainApi
  const [errorMesage, setErrorMesage] = React.useState("");

  // Стейт просмотра/редактирования профиля
  const [edit, setEdit] = React.useState(false);

  // Стейт содержимого инпута в Movies
  const [moviesInputValue, setMoviesInputValue] = React.useState("");

  // Стейт содержимого инпута в SavedMovies
  const [savedMoviesInputValue, setSavedMoviesInputValue] = React.useState("");

  // Стейт блокировки инпута
  const [blockInput, setBlockInput] = React.useState(false);

  // Стейт состояния тумблера в Movies
  const [moviesTumbler, setMoviesTumbler] = React.useState(false);

  // Стейт состояния тумблера в SavedMovies
  const [savedMoviesTumbler, setSavedMoviesTumbler] = React.useState(false);

  // Стейт успешного изменения профиля
  const [successEditProfile, setSuccessEditProfile] = React.useState(false);

  // Стейт успешного поиска по избранным фильмам
  const [successSearch, setSuccessSearch] = React.useState(false);

  // Стейт количества карточек для показа
  const [amountShowCards, setAmountShowCards] = React.useState(
    window.innerWidth > LARGE
      ? AmountShowCardsAtLarge
      : window.innerWidth > MEDIUM
      ? AmountShowCardsAtMedium
      : AmountShowCardsAtShort
  );

  // Стейт количества карточек для добавления
  const [addShowCards, setAddShowCards] = React.useState(
    window.innerWidth > LARGE ? AddShowCardsAtLarge : AddShowCardsAtMedium
  );

  // Эффекты при монтировании App.js
  React.useEffect(() => {
    setFilterCards(JSON.parse(localStorage.getItem("filterCards")));
    setMoviesTumbler(JSON.parse(localStorage.getItem("moviesTumbler")));
    setSavedMoviesTumbler(JSON.parse(localStorage.getItem("savedMoviesTumbler")));
    setMoviesInputValue(JSON.parse(localStorage.getItem("moviesInputValue")));
  }, []);

  // Эффект проверки что инпут пустой
  React.useEffect(() => {
    savedMoviesInputValue.length === 0 && setSuccessSearch(false);
  }, [savedMoviesInputValue]);

  // Эффект сохранения положения тумблера
  React.useEffect(() => {
    localStorage.setItem("moviesTumbler", JSON.stringify(moviesTumbler));
  }, [moviesTumbler]);

  // Эффект проверки авторизации на сайте
  React.useEffect(() => {
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

  // Эффект получения информации о пользователе
  React.useEffect(() => {
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

  // Эффект получения избранных фильмов
  React.useEffect(() => {
    MainApi.getFilms()
      .then((cards) => {
        setSaveCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Эффект запроса карточек от BeatFilms
  React.useEffect(() => {
    api
      .getListCard()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Функция очистки localStorage при выходе
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

  // Функция добавления в избранные
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

  // Функция удаления из избранного
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

  // Функция запроса к АПИ на регистрацию
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

  // Функция запроса к АПИ на авторизацию
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

  // Функция изменения профайла
  function handleUpdateUser(name, email) {
    setPreloader(true);
    setBlockInput(true);
    MainApi.patchUserInfo(name, email)
      .then((response) => {
        setCurrentUser(response);
        setErrorMesage("");
        setEdit(false);
        setSuccessEditProfile(true);
      })
      .catch((err) => {
        setErrorMesage(err.message);
        setEdit(true);
        setSuccessEditProfile(false);
      })
      .finally(() => {
        setPreloader(false);
        setBlockInput(false);
      });
  }

  // Функция фильтрации карточек в Movies по ключевому слову
  function handleMoviesFilter(arrayforSearch) {
    // eslint-disable-next-line array-callback-return
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

  // Функция фильтрации карточек в SavedMovies по ключевому слову
  function handleSavedMoviesFilter(arrayforSearch) {
    // eslint-disable-next-line array-callback-return
    const newArray = arrayforSearch.filter((card) => {
      if (card.nameRU.toLowerCase().includes(savedMoviesInputValue)) {
        return card;
      }
    });
    savedMoviesInputValue.length === 0 ? setSuccessSearch(false) : setSuccessSearch(true);
    setFilterSavedCards(newArray);
  }

  // Автоматическое определение размера экрана
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
                  setEdit={setEdit}
                  handleUpdateUser={handleUpdateUser}
                  handleloggedOutClick={handleloggedOutClick}
                  setSuccessEditProfile={setSuccessEditProfile}
                  edit={edit}
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
            <Route path="/signin" element={<Navigate replace to="/" />} />
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
            <Route path="/signup" element={<Navigate replace to="/" />} />
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
