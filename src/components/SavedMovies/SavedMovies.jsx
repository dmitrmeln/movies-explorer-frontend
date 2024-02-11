import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  return (
    <>
      <SearchForm
        handleSearch={props.handleSearch}
      ></SearchForm>
      <MoviesCardList
        searchResultText={props.searchResultText}
        onMovieLike={props.onMovieLike}
        onMovieDelete={props.onMovieDelete}
        isLoading={props.isLoading}
        moviesList={props.movies}
      ></MoviesCardList>
    </>
  );
}

export default SavedMovies;
