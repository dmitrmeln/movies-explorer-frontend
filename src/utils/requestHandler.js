const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.resolve(res.json()).then(data => Promise.reject(data));
};

export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
