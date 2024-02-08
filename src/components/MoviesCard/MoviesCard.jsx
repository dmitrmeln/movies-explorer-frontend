import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BEAT_FILM_MOVIES_API_URL } from "../../utils/config";

export default function MoviesCard({ movie, onMovieLike, onMovieDelete }) {
  const likedMovies = JSON.parse(localStorage.getItem("liked-movies"));
  const [likeState, setLikeState] = useState(false);
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  useEffect(() => {
    if (likedMovies) {
      const isLiked = likedMovies.some((i) => i.movieId === movie.id);
      setLikeState(isLiked);
    }
  }, []);

  function handleLikeClick() {
    if (!likeState) {
      setLikeState(true);
    } else {
      setLikeState(false);
    }

    onMovieLike(movie);
  }

  function handleMovieDelete() {
    if (!likeState) {
      setLikeState(true);
    } else {
      setLikeState(false);
    }
    onMovieDelete(movie);
  }

  function handleMovieClick() {
    window.open(movie.trailerLink, "_blank");
  }

  function convertToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return hours + "ч " + remainingMinutes + "м";
  }

  return (
    <article className="movies-card">
      <img
        src={
          currentPath === "/movies"
            ? BEAT_FILM_MOVIES_API_URL + movie.image.url
            : movie.image
        }
        onClick={handleMovieClick}
        className="movies-card__image"
        alt="карточка"
        id={currentPath === "/movies" ? movie.id : movie.movieId}
      />
      <div className="movies-card__container">
        <h2 className="movies-card__heading">{movie.nameRU}</h2>
        {currentPath === "/movies" && (
          <button
            className={
              likeState
                ? "movies-card__likebtn movies-card__likebtn_active"
                : "movies-card__likebtn"
            }
            type="button"
            onClick={!likeState ? handleLikeClick : handleMovieDelete}
          ></button>
        )}
        {currentPath === "/saved-movies" && (
          <button
            type="button"
            className="movies-card__deletebtn"
            onClick={handleMovieDelete}
          ></button>
        )}
      </div>
      <p className="movies-card__duration">{convertToTime(movie.duration)}</p>
    </article>
  );
}
