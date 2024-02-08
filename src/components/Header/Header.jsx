import headerLogo from "../../images/logo.svg";
import headerBtn from "../../images/header-interactive-btn.svg";
import headerIcon from "../../images/icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header(props) {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const navigate = useNavigate();

  const currentPath = usePathname();

  const handleLoginClick = () => {
    navigate("signin");
  };

  const handleRegisterClick = () => {
    navigate("signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  function handleBurgerMenuClick() {
    props.onBurgerMenuClick();
  }

  return (
    <>
      {(currentPath === "/" ||
        currentPath === "/movies" ||
        currentPath === "/saved-movies" ||
        currentPath === "/profile") && (
        <header
          className={currentPath === "/" ? "header header__promo" : "header"}
        >
          <div className="header__container">
            <img
              onClick={handleLogoClick}
              className="header__logo"
              src={headerLogo}
              alt="логотип"
            />
            {props.loggedIn && (
              <div className="header__links">
                <Link className="header__link" to="/movies">
                  Фильмы
                </Link>
                <Link className="header__link" to="/saved-movies">
                  Сохранённые фильмы
                </Link>
              </div>
            )}
            {props.loggedIn ? (
              <div
                className={
                  currentPath === "/"
                    ? "header__user-container header__promo"
                    : "header__user-container"
                }
              >
                <Link className="header__link header__button" to="/profile">
                  Аккаунт
                  <div
                    className={
                      currentPath === "/"
                        ? "header__icon-container header__icon-promo"
                        : "header__icon-container"
                    }
                  >
                    <img
                      className="header__icon"
                      src={headerIcon}
                      alt="иконка профиля"
                    />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="header__buttons-container">
                <button
                  onClick={handleRegisterClick}
                  type="button"
                  className="header__signup-btn"
                >
                  Регистрация
                </button>
                <button
                  onClick={handleLoginClick}
                  type="button"
                  className="header__signin-btn"
                >
                  Войти
                </button>
              </div>
            )}
            {props.loggedIn && (
              <img
                onClick={handleBurgerMenuClick}
                className="header__burger-menu"
                src={headerBtn}
                alt="кнопка"
              />
            )}
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
