import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
  return (
    <>
      <SearchForm
        handleSearch={props.handleSearch}
      ></SearchForm>
      <MoviesCardList
        searchResultText={props.searchResultText}
        onMovieLike={props.onMovieLike}
        onMovieDelete={props.onMovieDelete}
        moreBtnActive={props.moreBtnActive}
        onMoreBtnClick={props.onMoreBtnClick}
        isLoading={props.isLoading}
        moviesList={props.movies}
      ></MoviesCardList>
    </>
  );
}

export default Movies;
