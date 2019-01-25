import { requestPromise } from '../helpers';

export class LastFM {
  constructor({ apiKey }) {
    this.apiKey = apiKey;

    this.urlBase = 'https://ws.audioscrobbler.com/2.0';
    this.requestMethod = 'artist.getInfo';
  }

  _makeUrl(artist) {
    if (!artist) return false;

    return `${this.urlBase}/?method=${this.requestMethod}&api_key=${this.apiKey}&artist=${encodeURI(artist)}&format=json`
  }

  artistInfo(artistName) {
    if (!artistName) return false;

    const requestUrl = this._makeUrl(artistName);

    return new Promise((resolve, reject) => {
      const request = requestPromise(requestUrl);
        request.then((data) => resolve(data));
        request.catch((err) => reject(err));
    });
  }
}
