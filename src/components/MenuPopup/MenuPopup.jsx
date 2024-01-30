import { Link, useLocation } from "react-router-dom";
import headerIcon from "../../images/icon.svg";

export default function MenuPopup(props) {
  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const currentPath = usePathname();

  return (
    <div>
      <div
        onMouseDown={props.onClose}
        className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      >
        <div className="popup__container">
          <button type="button" className="popup__close-button"></button>
          <div className="popup__links">
            <Link
              className={
                currentPath === "/"
                  ? "popup__link popup__link_active"
                  : "popup__link"
              }
              to="/"
            >
              Главная
            </Link>
            <Link
              className={
                currentPath === "/movies"
                  ? "popup__link popup__link_active"
                  : "popup__link"
              }
              to="/movies"
            >
              Фильмы
            </Link>
            <Link
              className={
                currentPath === "/saved-movies"
                  ? "popup__link popup__link_active"
                  : "popup__link"
              }
              to="/saved-movies"
            >
              Сохранённые фильмы
            </Link>
          </div>
          <div className="popup__account-container">
            <Link
              className="popup__account-link"
              to="/profile"
            >
              Аккаунт
              <div className="header__icon-container">
                <img
                  className="header__icon"
                  src={headerIcon}
                  alt="иконка профиля"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
