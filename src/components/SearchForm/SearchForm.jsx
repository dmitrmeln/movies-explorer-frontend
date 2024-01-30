import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchIcon from "../../images/search-form-icon.svg";

function SearchForm(props) {
  const [searchValue, setSearchValue] = useState("");
  const [isShortFilm, setIsShortFilm] = useState(false);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsShortFilm(!isShortFilm);

    // if (isShortFilm === true) {
    //   props.onCheckboxClick();
    // } else {
    //   props.onCheckboxUnclick()
    // }
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    // props.onSearchClick({
    //   name: searchValue
    // });
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
            placeholder="Фильм"
            onChange={handleChange}
            className="search-form__input"
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
