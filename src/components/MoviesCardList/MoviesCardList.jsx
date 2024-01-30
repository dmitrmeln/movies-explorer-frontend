import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList() {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  function handleMoreMoviesClick(evt) {
    // evt.preventDefault();
    // props.onSearchClick({
    //   name: searchValue
    // });
  }

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        {/* {cards.map((item) => (
        <Card
          key={item._id}
          card={item}
          onCardClick={onCardClick}
          onCardLike={onCardLike}
          onCardDelete={onCardDelete}
        />
      ))} */}
        {currentPath === "/movies" && (
          <>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
          </>
        )}
        {currentPath === "/saved-movies" && (
          <>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
            <MoviesCard></MoviesCard>
          </>
        )}
      </div>
      {currentPath === "/movies" && (
        <button
          type="button"
          className="movies-cardlist__morebtn"
          onClick={handleMoreMoviesClick}
        >
          Ещё
        </button>
      )}
      {currentPath === "/saved-movies" && (
        <div className="movies-cardlist__blank"></div>
      )}
    </section>
  );
}

export default MoviesCardList;
