import axios from 'axios';

export class LastFM {
  constructor({ apiKey }) {
    this.apiKey = apiKey;

    this.urlBase = 'https://ws.audioscrobbler.com/2.0';
    this.requestMethod = 'artist.getInfo';
  }

  request(url) {
    if (!url) return false;

    return new Promise((resolve, reject) => {
      axios.get(url).then(success => resolve(success)).catch(err => reject(err));
    });
  }

  makeUrl(artist) {
    if (!artist) return false;

    return `${this.urlBase}/?method=${this.requestMethod}&api_key=${this.apiKey}&artist=${encodeURI(artist)}&format=json`
  }

  artistInfo(artistName) {
    if (!artistName) return false;

    const requestUrl = this.makeUrl(artistName);

    return new Promise((resolve, reject) => {
      const request = this.request(requestUrl);
      request.then((data) => resolve(data)).catch((err) => reject(err));
    });
  }
}
