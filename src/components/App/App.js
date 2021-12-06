import { useState, useEffect } from "react";
import api from "../../utils/MoviesApi";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
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
  const [loggedIn, setLoggedIn] = useState(true);
  const [preloader, setpreloader] = useState(false);
  const [cards, setCards] = useState([]);

  function handleloggedInClick(e) {
    e.preventDefault();
    if (loggedIn === true ? setLoggedIn(false) : setLoggedIn(true));

    navigate("/", { replace: false });
  }

  function handlePreloader(e) {
    if (preloader === true ? setpreloader(false) : setpreloader(true));
  }

  // Получаем набор карточек и информацию о пользователе
  useEffect(() => {
    if (loggedIn === true) {
      // Promise.all([api.getListCard(), api.getUserInfo()])
      api
        .getListCard()
        .then((cards) => {
          // .then(([cards, userData]) => {
          setCards(cards);
          // setCurrentUser(userData.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <section className="root">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={
            <Movies loggedIn={loggedIn} handlePreloader={handlePreloader} isPreloader={preloader} cards={cards} />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies loggedIn={loggedIn} handlePreloader={handlePreloader} isPreloader={preloader} cards={cards} />
          }
        />
        <Route path="/profile" element={<Profile loggedIn={loggedIn} handleloggedInClick={handleloggedInClick} />} />
        <Route path="/signin" element={<Login handleloggedInClick={handleloggedInClick} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </section>
  );
}

export default App;
