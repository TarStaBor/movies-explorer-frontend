import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/Context";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const navigate = useNavigate();

  // Стейт  регистрации
  const [loggedIn, setLoggedIn] = useState(false);

  // Стейт актуального пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт карточек из BeatFilm
  const [cards, setCards] = useState([]);

  // Стейт карточек из нашего API
  const [saveCards, setSaveCards] = useState([]);

  // Стейт отфильтрованных карточек
  const [filterCards, setFilterCards] = useState([]);

  // Стейт избранных отфильтрованных карточек
  const [filterSavedCards, setFilterSavedCards] = useState([]);

  // Стейт прелодера
  const [preloader, setPreloader] = useState(false);

  // Стейт сообщения с ошибкой при обращении к MainApi
  const [errorMesage, setErrorMesage] = useState("");

  // Стейт просмотра/редактирования профиля
  const [edit, setEdit] = useState(false);

  // Стейт количества карточек для показа
  const [amountShowCards, setAmountShowCards] = useState(
    window.innerWidth > 1279 ? 12 : window.innerWidth > 767 ? 8 : 5
  );

  // Стейт количества карточек для добавления
  const [addShowCards, setAddShowCards] = useState(window.innerWidth > 1279 ? 3 : 2);

  // Стейт содержимого инпута в Movies
  const [moviesInputValue, setMoviesInputValue] = useState("");

  // Стейт содержимого инпута в SavedMovies
  const [savedMoviesInputValue, setSavedMoviesInputValue] = useState("");

  // Стейт блокировки инпута
  const [blockInput, setBlockInput] = useState(false);

  // Стейт состояния тумблера в Movies
  const [moviesTumbler, setMoviesTumbler] = useState(false);

  // Стейт состояния тумблера в SavedMovies
  const [savedMoviesTumbler, setSavedMoviesTumbler] = useState(false);

  // Стейт успешного изменения профиля
  const [successEditProfile, setSuccessEditProfile] = useState(false);

  // Эффекты при монтировании App.js
  useEffect(() => {
    //обновить отфильтрованные карточки из локального хранилища
    setFilterCards(JSON.parse(localStorage.getItem("filterCards")));

    //обновить избранные отфильтрованные карточки из локального хранилища
    setFilterSavedCards(JSON.parse(localStorage.getItem("filterSavedCards")));

    //обновить положение чекбокса из локального хранилища для Movies
    setMoviesTumbler(JSON.parse(localStorage.getItem("moviesTumbler")));

    //обновить положение чекбокса из локального хранилища для SavedMovies
    setSavedMoviesTumbler(JSON.parse(localStorage.getItem("savedMoviesTumbler")));

    //обновить содержимое инпута для Movies
    setMoviesInputValue(JSON.parse(localStorage.getItem("moviesInputValue")));

    //обновить содержимое инпута для Saved-Movies
    setSavedMoviesInputValue(JSON.parse(localStorage.getItem("savedMoviesInputValue")));
  }, []);

  // Эффект проверки авторизации на сайте
  useEffect(() => {
    if (localStorage.getItem("token")) {
      MainApi.getUserInfo(localStorage.token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, []);

  // Эффект получения информации о пользователе
  useEffect(() => {
    if (loggedIn === true) {
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
  useEffect(() => {
    MainApi.getFilms()
      .then((cards) => {
        setSaveCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Эффект запроса карточек от BeatFilms
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

  // Функция очистки localStirage при выходе
  function handleloggedOutClick(e) {
    e.preventDefault();
    localStorage.removeItem("filterCards");
    localStorage.removeItem("filterSavedCards");
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
        setSaveCards(saveCards.filter((m) => m._id !== card._id));
        setFilterSavedCards(saveCards.filter((m) => m._id !== card._id));
        localStorage.setItem("filterSavedCards", JSON.stringify(saveCards.filter((m) => m._id !== card._id)));
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
      .then(() => {
        navigate("/signin", { replace: false });
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
    localStorage.setItem("filterSavedCards", JSON.stringify(newArray));
    setFilterSavedCards(JSON.parse(localStorage.getItem("filterSavedCards")));
    localStorage.setItem("savedMoviesInputValue", JSON.stringify(savedMoviesInputValue));
    localStorage.setItem("savedMoviesTumbler", JSON.stringify(savedMoviesTumbler));
  }

  // Автоматическое определение размера экрана
  window.onresize = () => {
    if (window.innerWidth > 1279) {
      setAddShowCards(3);
    } else {
      setAddShowCards(2);
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
                  tumbler={moviesTumbler}
                  setTumbler={setMoviesTumbler}
                  filterCards={filterCards}
                  handleFilter={handleMoviesFilter}
                  setMoviesInputValue={setMoviesInputValue}
                  amountShowCards={amountShowCards}
                  setAmountShowCards={setAmountShowCards}
                  addShowCards={addShowCards}
                  handleDeleteFilm={handleDeleteFilm}
                  handleSaveFilm={handleSaveFilm}
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
                  filterSavedCards={filterSavedCards}
                  tumbler={savedMoviesTumbler}
                  setTumbler={setSavedMoviesTumbler}
                  handleFilter={handleSavedMoviesFilter}
                  setSavedMoviesInputValue={setSavedMoviesInputValue}
                  amountShowCards={amountShowCards}
                  setAmountShowCards={setAmountShowCards}
                  addShowCards={addShowCards}
                  handleDeleteFilm={handleDeleteFilm}
                  handleSaveFilm={handleSaveFilm}
                  saveCards={saveCards}
                  loggedIn={loggedIn}
                  isPreloader={preloader}
                  searchValue={savedMoviesInputValue}
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
                  edit={edit}
                  errorMesage={errorMesage}
                  handleUpdateUser={handleUpdateUser}
                  loggedIn={loggedIn}
                  handleloggedOutClick={handleloggedOutClick}
                  isPreloader={preloader}
                  blockInput={blockInput}
                  successEditProfile={successEditProfile}
                  setSuccessEditProfile={setSuccessEditProfile}
                />
              </ProtectedRoute>
            }
          />
          <Route
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
          <Route
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
          <Route path="*" element={<Error />} />
        </Routes>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default App;
