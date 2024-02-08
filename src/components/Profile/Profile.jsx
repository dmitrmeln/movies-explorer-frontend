import { useState, useEffect, useContext } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, isValid, setValues, errors } =
    useFormAndValidation();

  const [isOnEdit, setIsOnEdit] = useState(false);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOnEdit]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const delay = 1500;

    props.onUpdateUser({
      name: values.name,
      email: values.email,
    });

    setTimeout(() => {
      setIsOnEdit(false);
    }, delay);
  }

  function handleEditClick() {
    setIsOnEdit(true);
  }

  function handleSignOut() {
    props.onSignOutClick();
  }

  return (
    <div className="profile">
      <h1 className="profile__heading">Привет, {currentUser.name}!</h1>
      <form
        className="profile__form"
        noValidate
        name="profile-form"
        onSubmit={handleSubmit}
      >
        <div className="profile__input-container">
          <label className="profile__label" htmlFor="name">
            Имя
          </label>
          <input
            type="text"
            value={values.name || ""}
            pattern="^[a-zA-Zа-яА-Я\s\-]*"
            onChange={handleChange}
            className="profile__input"
            id="profile__name"
            name="name"
            minLength="2"
            maxLength="30"
            disabled={!isOnEdit ? true : false}
            required
          />
        </div>
        <div className="profile__input-container">
          <label className="profile__label" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            className="profile__input"
            id="profile__email"
            name="email"
            minLength="2"
            maxLength="20"
            disabled={!isOnEdit ? true : false}
            required
          />
        </div>
        <span className="profile__value-error">
          {errors.email ? errors.name : ""}
        </span>
        <span
          className={
            props.successMessage
              ? "profile__error profile__success-message"
              : "profile__error"
          }
        >
          {errors.email ? errors.email : errors.name}
          {props.successMessage ? props.successMessage : props.errorMessage}
        </span>
        <div className="profile__buttons">
          {!isOnEdit && (
            <>
              <button
                type="button"
                onClick={handleEditClick}
                className="profile__button"
              >
                Редактировать
              </button>
              <Link to="/signin">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="profile__button profile__button_red"
                >
                  Выйти из аккаунта
                </button>
              </Link>
            </>
          )}
          {isOnEdit && (
            <button
              type="submit"
              className={
                isValid &&
                !props.errorMessage &&
                (values.name !== currentUser.name ||
                  values.email !== currentUser.email)
                  ? "profile__submit-btn"
                  : "profile__submit-btn profile__submit-btn_disabled"
              }
              disabled={
                isValid &&
                !props.errorMessage &&
                (values.name !== currentUser.name ||
                  values.email !== currentUser.email)
                  ? false
                  : true
              }
            >
              Сохранить
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
