import { useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [preloader, setpreloader] = useState(false);

  function handleloggedInClick(e) {
    e.preventDefault();
    if (loggedIn === true ? setLoggedIn(false) : setLoggedIn(true));

    navigate("/", { replace: false });
  }

  function handlePreloader(e) {
    if (preloader === true ? setpreloader(false) : setpreloader(true));
  }

  return (
    <section className="root">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/movies"
          element={<Movies loggedIn={loggedIn} handlePreloader={handlePreloader} isPreloader={preloader} />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies loggedIn={loggedIn} handlePreloader={handlePreloader} isPreloader={preloader} />}
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
