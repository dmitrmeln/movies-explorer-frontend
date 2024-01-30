import { useState } from "react";
// import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import moviesCardPic from "../../images/movies-card-pic.png";
import { useLocation } from "react-router-dom";

export default function MoviesCard() {
  // const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(false);
  // const isOwn = card.owner === currentUser._id;
  // const isLiked = card.likes.some((i) => i === currentUser._id);
  // const cardLikeButtonClassName = `card__like ${
  //   isLiked && "card__like_active"
  // }`;

  // function handleClick() {
  //   onCardClick(card);
  // }

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  function handleLikeClick() {
    if (!isLiked) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  function handleDeleteClick() {
    // onCardDelete(card);
  }

  return (
    <article className="movies-card">
      <img
        src={moviesCardPic}
        className="movies-card__image"
        alt="карточка"
        // id={card._id}
      />
      <div className="movies-card__container">
        <h2 className="movies-card__heading">33 слова о дизайне</h2>
        {currentPath === "/movies" && (
          <button
            className={
              isLiked
                ? "movies-card__likebtn movies-card__likebtn_active"
                : "movies-card__likebtn"
            }
            type="button"
            onClick={handleLikeClick}
          ></button>
        )}
        {currentPath === "/saved-movies" && (
          <button
            type="button"
            className="movies-card__deletebtn"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
      <p className="movies-card__duration">1ч 42м</p>
    </article>
  );
}
