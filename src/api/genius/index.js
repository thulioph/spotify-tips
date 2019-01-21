import { requestPromise } from '../helpers';

export class GeniusApi {
  constructor() {
    this.urlBase = 'https://api.genius.com';
    this.accessToken = 'ABC123';
  }

  makeUrlFromApiPath(apiPath) {
    if (!apiPath) return false;

    return `${this.urlBase}/${apiPath}?access_token=${this.accessToken}`;
  }

  makeUrlFromQuery(query) {
    if (!query) return false;

    return `${this.urlBase}/search?access_token=${this.accessToken}&q=${encodeURIComponent(query)}`;
  }

  getData(requestUrl) {
    if (!requestUrl) return false;

    return new Promise((resolve, reject) => {
      const request = requestPromise(requestUrl);
        request.then(data => resolve(data));
        request.catch(err => reject(err));
    });
  }
}