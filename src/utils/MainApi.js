import { request } from "./requestHandler";
const { REACT_APP_API_URL, BEAT_FILM_MOVIES_API_URL } = require('./config');

class MainApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  getUserInfo() {
    return request(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: 'include',
    });
  }

  setUserInfo(data) {
    return request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  getLikedMovies() {
    return request(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: 'include',
    });
  }

  createMovie(movie) {
    return request(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration.toString(),
          year: movie.year,
          description: movie.description,
          image: `${BEAT_FILM_MOVIES_API_URL + movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `${BEAT_FILM_MOVIES_API_URL + movie.image.formats.thumbnail.url}`,
          movieId: movie.id.toString(),
          nameRU: movie.nameRU,
          nameEN: movie.nameEN
      }),
    });
  }

  deleteMovie(id) {
    return request(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: REACT_APP_API_URL,
});
