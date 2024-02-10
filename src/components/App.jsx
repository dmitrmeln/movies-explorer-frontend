import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import MenuPopup from "./MenuPopup/MenuPopup";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRout/ProtectedRout";
import Movies from "./Movies/Movies";
import SavedMovies from "./SavedMovies/SavedMovies";
import Profile from "./Profile/Profile";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ErrorPage from "./ErrorPage/ErrorPage";
import * as Auth from "../utils/Auth";
import { mainApi } from "../utils/MainApi";
import { moviesApi } from "../utils/MoviesApi";
import Cookies from "js-cookie";
import {
  NOT_FOUND_MESSAGE,
  PROFILE_CHANGE_MESSAGE,
  SERVER_ERROR_MESSAGE,
} from "../utils/config";

function App() {
  const [isMenuPopupOpen, setMenuPopupState] = useState(false);
  const [currentUser, setCurrentUser] = useState({ email: "", name: "" });
  const [loggedIn, setloggedIn] = useState(false);
  const [apiSearchedMovies, setApiSearchedMovies] = useState([]);
  const [savedSearchedMovies, setSavedSearchedMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [searchedLikedMovies, setSearchedLikedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(16);
  const [cardsToLoad, setCardsToLoad] = useState(4);
  const [isMoreBtnActive, setMoreBtnState] = useState(false);
  const [searchResultText, setSearchResultText] = useState("");
  const [likedMoviesResultText, setLikedMoviesResultText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const renderedMovies = savedSearchedMovies.slice(0, cardsToShow);
  const [isPageOpen, setPageState] = useState(false);
  const [isSubmitting, setSubmittingState] = useState(false);

  let resizeTimeout;
  const navigate = useNavigate();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  const approvedPages = [
    "/",
    "/movies",
    "/saved-movies",
    "/profile",
    "/signin",
    "/signup",
  ];
  const isApproved = approvedPages.some((path) => path === currentPath);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    auth(jwt);
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true && isApproved) {
      mainApi
        .getUserInfo()
        .then((result) => {
          setCurrentUser(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        setMenuPopupState(false);
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

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    const filteredMovies = JSON.parse(localStorage.getItem("filtered-movies"));
    if (movies) {
      setApiSearchedMovies(movies);
      setSavedSearchedMovies(filteredMovies);
    }
  }, []);

  useEffect(() => {
    const searchResultText = localStorage.getItem("search-result-text");
    if (searchResultText) {
      setSearchResultText(searchResultText);
    }
  }, []);

  useEffect(() => {
    setPageState(false);
    const likedMovies = JSON.parse(localStorage.getItem("liked-movies"));

    if (currentPath === "/saved-movies" && likedMovies) {
      setSearchedLikedMovies(likedMovies);
      setPageState(true);
    }
  }, [isPageOpen, currentPath]);

  useEffect(() => {
    const savedFilteredMovies = JSON.parse(
      localStorage.getItem("filtered-movies")
    );
    if (savedFilteredMovies) {
      if (savedFilteredMovies.length === 0 && !isLoading) {
        setSearchResultText(NOT_FOUND_MESSAGE);
      } else {
        setSearchResultText("");
      }
    } else if (!savedFilteredMovies && !isLoading) {
      setSearchResultText(NOT_FOUND_MESSAGE);
    }
  }, [renderedMovies, isLoading]);

  useEffect(() => {
    if (searchedLikedMovies.length === 0 && !isLoading) {
      setLikedMoviesResultText(NOT_FOUND_MESSAGE);
    } else {
      setLikedMoviesResultText("");
    }
  }, [searchedLikedMovies, isLoading]);

  useEffect(() => {
    handleScreenSizeRender();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (renderedMovies.length >= savedSearchedMovies.length || isLoading) {
      setMoreBtnState(false);
    } else {
      setMoreBtnState(true);
    }
  }, [renderedMovies, isLoading]);

  useEffect(() => {
    getLikedMovies();
  }, []);

  function auth(jwt) {
    if (jwt && isApproved) {
      return Auth.tokenCheck(jwt)
        .then(() => {
          setloggedIn(true);
          currentPath === "/signup" || currentPath === "/signin"
            ? navigate("/movies", { replace: true })
            : navigate(currentPath);
        })
        .catch((error) => {
          console.log(error);
          setloggedIn(false);
        });
    }
  }

  async function handleSignOut() {
    const localStorageKeys = [
      "movies",
      "filtered-movies",
      "search-value",
      "liked-movies",
    ];

    await deleteAllLikedMovies();

    try {
      await Auth.signout();
      setloggedIn(false);
      localStorageKeys.forEach((key) => localStorage.removeItem(key));
      setApiSearchedMovies([]);
      setSavedSearchedMovies([]);
      setSearchedLikedMovies([]);
      setLikedMovies([]);
      setSearchResultText("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handleRegister({ name, email, password }) {
    setSubmittingState(true);
    return Auth.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
        setSubmittingState(false);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSubmittingState(false);
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      });
  }

  function handleLogin({ email, password }) {
    setSubmittingState(true);
    return Auth.login(email, password)
      .then((res) => {
        Cookies.set("jwt", res.token, { expires: 7 });
        setloggedIn(true);
        setSubmittingState(false);
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSubmittingState(false);
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      });
  }

  function handleUpdateUser(data) {
    setSubmittingState(true);
    return mainApi
      .setUserInfo(data)
      .then((result) => {
        setCurrentUser(result);
        setSubmittingState(false);
        setSuccessMessage(PROFILE_CHANGE_MESSAGE);
        setTimeout(() => {
          setSuccessMessage("");
        }, 1500);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSubmittingState(false);
        setTimeout(() => {
          setErrorMessage("");
        }, 1500);
      });
  }

  function closePopup(evt) {
    if (
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup__link") ||
      evt.target.classList.contains("popup__account-link") ||
      evt.target.classList.contains("popup_opened")
    ) {
      setMenuPopupState(false);
    }
  }

  function handleBurgerMenuClick() {
    setMenuPopupState(true);
  }

  function handleSearch(data) {
    setSearchResultText("");
    setCardsToShow(0);
    if (!localStorage.getItem("movies")) {
      setIsLoading(true);
      return moviesApi
        .getMoviesList()
        .then((result) => {
          const filteredMovies = filterMovies(
            data,
            result,
            data.durationFilter
          );
          localStorage.setItem("movies", JSON.stringify(result));
          localStorage.setItem(
            "filtered-movies",
            JSON.stringify(filteredMovies)
          );
          localStorage.setItem("search-value", JSON.stringify(data));
          setApiSearchedMovies(result);
          setCardsToShow(cardsToShow);
          setSavedSearchedMovies(filteredMovies);
        })
        .catch((error) => {
          console.log(error);
          setSearchResultText(SERVER_ERROR_MESSAGE);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const filteredMovies = filterMovies(
        data,
        apiSearchedMovies,
        data.durationFilter
      );
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCardsToShow(cardsToShow);
        setSavedSearchedMovies(filteredMovies);
        localStorage.setItem("filtered-movies", JSON.stringify(filteredMovies));
        localStorage.setItem("search-value", JSON.stringify(data));
      }, 500);
    }
  }

  function handleLikedMoviesSearch(data) {
    setSearchedLikedMovies([]);
    setLikedMoviesResultText("");
    const filteredMovies = filterMovies(data, likedMovies, data.durationFilter);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSearchedLikedMovies(filteredMovies);
    }, 500);
  }

  function handleMovieLike(data) {
    const isMovieLiked = likedMovies.some((movie) => movie.movieId === data.id);

    if (isMovieLiked) {
      handleMovieDelete(data);
    } else {
      return mainApi
        .createMovie(data)
        .then((newMovie) => {
          const updatedLikedMovies = [newMovie, ...likedMovies];
          setLikedMovies(updatedLikedMovies);
          setSearchedLikedMovies(updatedLikedMovies);
          localStorage.setItem(
            "liked-movies",
            JSON.stringify(updatedLikedMovies)
          );
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    }
  }

  function handleMovieDelete(data) {
    const movieId = data.id ? data.id : data.movieId;
    return mainApi
      .deleteMovie(movieId)
      .then(() => {
        const updatedLikedMovies = likedMovies.filter(
          (m) => m.movieId !== movieId
        );

        const updatedSearchedLikedMovies = searchedLikedMovies.filter(
          (m) => m.movieId !== movieId
        );
        setLikedMovies(updatedLikedMovies);
        setSearchedLikedMovies(updatedSearchedLikedMovies);
        localStorage.setItem(
          "liked-movies",
          JSON.stringify(updatedLikedMovies)
        );
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function getLikedMovies() {
    const likedMovies = localStorage.getItem("liked-movies");

    if (likedMovies) {
      return mainApi
        .getLikedMovies()
        .then((res) => {
          setLikedMovies(res.reverse());
          setSearchedLikedMovies(res.reverse());
          localStorage.setItem("liked-movies", JSON.stringify(res.reverse()));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function deleteAllLikedMovies() {
    const likedMovies = JSON.parse(localStorage.getItem("liked-movies"));
    if (likedMovies) {
      likedMovies.forEach((movie) => {
        mainApi.deleteMovie(movie.movieId).catch((error) => {
          console.log(error);
        });
      });
    }
  }

  function filterMovies(value, movies, durationFilter) {
    if (durationFilter === true) {
      const filteredMovies = movies.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(value.name.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(value.name.toLowerCase())) &&
          movie.duration <= 40
      );

      return filteredMovies;
    } else {
      const filteredMovies = movies.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(value.name.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(value.name.toLowerCase())) &&
          movie.duration > 0
      );

      return filteredMovies;
    }
  }

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleScreenSizeRender, 200);
  };

  const loadMoreCards = () => {
    if (!(cardsToShow + cardsToLoad > savedSearchedMovies.length)) {
      setCardsToShow(cardsToShow + cardsToLoad);
    } else {
      setCardsToShow(savedSearchedMovies.length);
    }
  };

  function handleScreenSizeRender() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setCardsToShow(16);
      setCardsToLoad(4);
    } else if (screenWidth > 480) {
      setCardsToShow(8);
      setCardsToLoad(2);
    } else if (screenWidth >= 320 && screenWidth <= 480) {
      setCardsToShow(5);
      setCardsToLoad(2);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onBurgerMenuClick={handleBurgerMenuClick} loggedIn={loggedIn} />
        <main className="page__content">
          <Routes>
            <Route path="*" element={<ErrorPage loggedIn={loggedIn} />} />
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/movies"
              element={
                <ProtectedRouteElement
                  element={Movies}
                  onMovieLike={handleMovieLike}
                  onMovieDelete={handleMovieDelete}
                  searchResultText={searchResultText}
                  onMoreBtnClick={loadMoreCards}
                  moreBtnActive={isMoreBtnActive}
                  isLoading={isLoading}
                  handleSearch={handleSearch}
                  movies={renderedMovies}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  onMovieDelete={handleMovieDelete}
                  searchResultText={likedMoviesResultText}
                  isLoading={isLoading}
                  handleSearch={handleLikedMoviesSearch}
                  // movies={likedMovies}
                  movies={searchedLikedMovies}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRouteElement
                  element={Profile}
                  errorMessage={errorMessage}
                  loggedIn={loggedIn}
                  onUpdateUser={handleUpdateUser}
                  onSignOutClick={handleSignOut}
                  successMessage={successMessage}
                  isSubmitting={isSubmitting}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  onSubmit={handleRegister}
                  errorMessage={errorMessage}
                  isSubmitting={isSubmitting}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  onSubmit={handleLogin}
                  errorMessage={errorMessage}
                  isSubmitting={isSubmitting}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>

      <MenuPopup isOpen={isMenuPopupOpen} onClose={closePopup} />
    </CurrentUserContext.Provider>
  );
}

export default App;
