export class MoviesApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  // метод обработки ответа сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getListCard() {
    return fetch(this._url, {
      method: "GET",
    }).then((response) => {
      return this._getResponseData(response);
    });
  }
}

const api = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
});

export default api;
