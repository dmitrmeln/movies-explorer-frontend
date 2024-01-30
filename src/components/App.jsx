import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import MenuPopup from "./MenuPopup/MenuPopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRout/ProtectedRout";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ErrorPage from "./ErrorPage/ErrorPage";

function App() {
  const [isMenuPopupOpen, setMenuPopupState] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setloggedIn] = useState(true);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        changeAllPopupsState();
      }
    }

    if (
      [isMenuPopupOpen].some((state) => {
        return state === true;
      })
    ) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isMenuPopupOpen]);

  function changeAllPopupsState() {
    setMenuPopupState(false);
  }

  function closeAllPopups(evt) {
    if (
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup__link") ||
      evt.target.classList.contains("popup__account-link") ||
      evt.target.classList.contains("popup_opened")
    ) {
      changeAllPopupsState();
    }
  }

  function handleBurgerMenuClick() {
    setMenuPopupState(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onBurgerMenuClick={handleBurgerMenuClick} />
        <main className="page__content">
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement element={Main} loggedIn={loggedIn} />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement element={Movies} loggedIn={loggedIn} />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement element={Profile} loggedIn={loggedIn} />
              }
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <MenuPopup isOpen={isMenuPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
