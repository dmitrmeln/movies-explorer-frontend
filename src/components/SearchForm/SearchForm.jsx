import { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-form-icon.svg";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [searchValue, setSearchValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("Фильм");
  const [errorState, setErrorState] = useState(false);

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();
  const savedSearchValue = JSON.parse(localStorage.getItem("search-value"));

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (currentPath === "/movies" && savedSearchValue) {
      setSearchValue(savedSearchValue.name);
      setIsShortFilm(savedSearchValue.durationFilter);
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsShortFilm(!isShortFilm);

    if (searchValue) {
      props.handleSearch({
        name: searchValue,
        durationFilter: !isShortFilm ? true : false,
      });
    }
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!searchValue) {
      setErrorState(true);
      setSearchPlaceHolder("Нужно ввести ключевое слово");
      setTimeout(() => {
        setSearchPlaceHolder("Фильм");
        setErrorState(false);
      }, 1000);
      return;
    }

    props.handleSearch({
      name: searchValue,
      durationFilter: isShortFilm ? true : false,
    });
  }

  return (
    <section className="search-form">
      <form
        className="search-form__container"
        name="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="search-form__input-container">
          <img
            className="search-form__icon"
            src={searchIcon}
            alt="иконка поиска"
          />
          <input
            type="text"
            placeholder={searchPlaceHolder}
            value={searchValue || ""}
            onChange={handleChange}
            className={
              errorState
                ? "search-form__input search-form__input-error"
                : "search-form__input"
            }
            id="search-form__input"
            name="movie"
            minLength="2"
            maxLength="40"
            required
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
        </div>
        <FilterCheckbox
          isShortFilm={isShortFilm}
          handleCheckboxChange={handleCheckboxChange}
        ></FilterCheckbox>
      </form>
    </section>
  );
}

export default SearchForm;
