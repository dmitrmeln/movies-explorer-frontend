import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import Preloader from "../Preloader/Preloader";

function Movies() {
  return (
    <>
      <SearchForm></SearchForm>
      {/* <Preloader></Preloader> */}
      <MoviesCardList></MoviesCardList>
    </>
  );
}

export default Movies;
