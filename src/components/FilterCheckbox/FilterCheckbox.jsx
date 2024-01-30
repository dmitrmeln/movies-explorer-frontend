function FilterCheckbox(props) {
  return (
    <div className="checkbox__container">
      <input
        type="checkbox"
        id="checkbox"
        className="checkbox__input"
        checked={props.isShortFilm}
        onChange={props.handleCheckboxChange}
      />
      <label htmlFor="checkbox" className="checkbox__label">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="20"
          viewBox="0 0 36 20"
          fill="none">
          <rect
            width="36"
            height="20"
            rx="10"
            fill="#343434"
          />
          <circle
            className="checkbox__small-circle"
            cx={props.isShortFilm ? "26" : "10"}
            cy="10"
            r="8"
            fill={props.isShortFilm ? "#2BE080" : "#F5F5F5"}
          />
          <circle
            className="checkbox__big-circle"
            cx={props.isShortFilm ? "26" : "10"}
            cy="10"
            r="7.5"
            stroke="white"
          />
        </svg>
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
