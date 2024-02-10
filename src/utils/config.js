const {
  REACT_APP_API_URL='https://api.movies-dip.nomoredomainsmonster.ru/',
  BEAT_FILM_MOVIES_API_URL = "https://api.nomoreparties.co/",
  NOT_FOUND_MESSAGE = "Ничего не найдено",
  PROFILE_CHANGE_MESSAGE = "Вы успешно изменили профиль!",
  SERVER_ERROR_MESSAGE = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.",
} = process.env;

module.exports = {
  REACT_APP_API_URL,
  BEAT_FILM_MOVIES_API_URL,
  NOT_FOUND_MESSAGE,
  PROFILE_CHANGE_MESSAGE,
  SERVER_ERROR_MESSAGE,
};
