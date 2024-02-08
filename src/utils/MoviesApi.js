import { request } from "./requestHandler";
const { BEAT_FILM_MOVIES_API_URL } = require('./config');

class MoviesApi {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl;
  }

  getMoviesList() {
    return request(`${this._baseUrl}/beatfilm-movies`, {
      method: "GET",
    });
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: BEAT_FILM_MOVIES_API_URL,
});
