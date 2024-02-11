import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

function MoviesCardList(props) {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  function handleMoreMoviesClick() {
    props.onMoreBtnClick();
  }

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        {currentPath === "/movies" && (
          <>
            {props.moviesList.map((item) => (
              <MoviesCard
                key={item.id}
                movie={item}
                onMovieLike={props.onMovieLike}
                onMovieDelete={props.onMovieDelete}
              />
            ))}
          </>
        )}
        {currentPath === "/saved-movies" && (
          <>
            {props.moviesList.map((item) => (
              <MoviesCard
                key={item.movieId}
                movie={item}
                onMovieLike={props.onMovieLike}
                onMovieDelete={props.onMovieDelete}
              />
            ))}
          </>
        )}
      </div>
      <Preloader isLoading={props.isLoading}></Preloader>
      <>
        <p
          className={
            currentPath === "/movies" || !props.searchResultText
              ? "movies-cardlist__search-text"
              : "movies-cardlist__search-text movies-cardlist__search-text_padding"
          }
        >
          {props.searchResultText}
        </p>
        <button
          type="button"
          className={
            props.moreBtnActive
              ? "movies-cardlist__morebtn movies-cardlist__morebtn_active"
              : "movies-cardlist__morebtn"
          }
          onClick={handleMoreMoviesClick}
        >
          Ещё
        </button>
      </>
      {currentPath === "/saved-movies" && (
        <div className="movies-cardlist__blank"></div>
      )}
    </section>
  );
}

export default MoviesCardList;
