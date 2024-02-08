import { request } from "./requestHandler";
const { REACT_APP_API_URL } = require('./config');

export const register = (name, email, password) => {
  return request(`${REACT_APP_API_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}),
  });
};

export const login = (email, password) => {
  return request(`${REACT_APP_API_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password}),
  });
};

export const signout = (token) => {
  return request(`${REACT_APP_API_URL}/signout`, {
    method: "POST",
    credentials: 'include',
  });
};

export const tokenCheck = (token) => {
  return request(`${REACT_APP_API_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
  });
};