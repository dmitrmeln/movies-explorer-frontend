import {useContext} from "react";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
      {/* <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <div onClick={onEditAvatar} className="profile__avatar-icon"></div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="profile__add-button"></button>
      </section>
      <section className="cards">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section> */}
    </>
  );
}

export default Main;
