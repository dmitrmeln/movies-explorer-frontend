import { useState, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const [errorMessage, setErrorMessage] = useState("");
  const [isOnEdit, setIsOnEdit] = useState(false);

  const [userName, setUserName] = useState("Дмитрий");
  const [userEmail, setUserEmail] = useState("pochta@yandex.ru");

  useEffect(() => {
    setValues({ name: userName, email: userEmail });
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    const delay = 500;

    // props
    //   .onSubmit({
    //     email,
    //     name,
    //   })
    //   .then(() => {
    //     setEmail("");
    //     setName("");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

    if (isValid) {
      setUserName(values.name);
      setUserEmail(values.email)
      setErrorMessage("");
      setTimeout(() => {
        setIsOnEdit(false);
      }, delay);
    } else {
      setErrorMessage("При обновлении профиля произошла ошибка.");
      setTimeout(() => {
        setErrorMessage("");
        setValues({ name: userName, email: userEmail });
        setIsOnEdit(false);
      }, delay);
    }
  }

  function handleEditClick() {
    setIsOnEdit(true);
  }

  function handleSignOut(evt) {}

  return (
    <div className="profile">
      <h1 className="profile__heading">Привет, {userName}!</h1>
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
            onChange={handleChange}
            className="profile__input"
            id="profile__name"
            name="name"
            minLength="2"
            maxLength="40"
            disabled={!isOnEdit? true : false}
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
            maxLength="40"
            disabled={!isOnEdit? true : false}
          />
        </div>
        <span className="profile__error">{errorMessage}</span>
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
                errorMessage === "" ? "profile__submit-btn" : "profile__submit-btn profile__submit-btn_disabled"
              }
              disabled={errorMessage === "" ? false : true}
            >
              Сохранить
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
