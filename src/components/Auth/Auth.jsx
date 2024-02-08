import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { Link, useLocation } from "react-router-dom";
import headerLogo from "../../images/logo.svg";

export default function Auth(props) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  useEffect(() => {
    resetForm();
    setValues({ name: "", email: "", password: "" });
  }, []);

  function handleRegister(evt) {
    evt.preventDefault(evt);

    props.onSubmit({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }

  function handleLogin(evt) {
    evt.preventDefault(evt);

    props.onSubmit({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <div className="auth">
      <form
        className="auth__form"
        noValidate
        name="auth-form"
        onSubmit={currentPath === "/signup" ? handleRegister : handleLogin}
      >
        <Link className="auth__logo-container" to="/">
          <img className="header__logo" src={headerLogo} alt="логотип" />
        </Link>
        <h1 className="auth__heading">{props.heading}</h1>
        {currentPath === "/signup" && (
          <>
            <div className="auth__input-container">
              <label className="auth__label" htmlFor="name">
                Имя
              </label>
              <input
                type="text"
                pattern="^[a-zA-Zа-яА-Я\s\-]*"
                value={values.name || ""}
                onChange={handleChange}
                className="auth__input"
                id="auth__name"
                name="name"
                minLength="2"
                maxLength="40"
                required
              />
            </div>
            <span className="auth__error">{errors.name}</span>
          </>
        )}
        <div className="auth__input-container">
          <label className="auth__label" htmlFor="email">
            E-mail
          </label>
          <input
            type="email"
            value={values.email || ""}
            onChange={handleChange}
            className="auth__input"
            id="auth__email"
            name="email"
            minLength="2"
            maxLength="40"
            required
          />
        </div>
        <span className="auth__error">{errors.email}</span>
        <div className="auth__input-container">
          <label className="auth__label" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            value={values.password || ""}
            onChange={handleChange}
            className={
              errors.password ? "auth__input auth__input_red" : "auth__input"
            }
            id="auth__password"
            name="password"
            minLength="5"
            maxLength="16"
            required
          />
        </div>
        <span className="auth__error">{errors.password}</span>
        <div
          className={
            currentPath === "/signup" ? "auth__buttons" : "auth__buttons-login"
          }
        >
          <span className="auth__error">{props.errorMessage}</span>
          <button
            type="submit"
            className={
              isValid ? "auth__button" : "auth__button auth__button_disabled"
            }
            disabled={isValid ? false : true}
          >
            {props.submitButtonName}
          </button>
          <p className="auth__text">
            {props.bottomText}
            <Link className="auth__link" to={props.linkTo}>
              {props.bottomLink}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
