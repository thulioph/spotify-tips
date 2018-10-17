import { requestPromise } from '../helpers';

export class Lyrics {
  constructor({ apiKey }) {
    this.apiKey = apiKey;
    this.urlBase = 'https://api.musixmatch.com/ws/1.1';
  }

  _makeUrl(method) {
    if (!method) return false;

    return `${this.urlBase}/${method}?apikey=${this.apiKey}`;
  }

  getLyrics(trackId) {
    if (!trackId) return false;

    const method = 'track.lyrics.get';
    const URL = `${this._makeUrl(method)}&track_id=${trackId}`;

    return new Promise((resolve, reject) => {
      const request = requestPromise(URL);
      request.then((data) => resolve(data.message.body)).catch((err) => reject(err));
    });
  }

  getTrackInfo({ artist, track }) {
    if (!artist || !track) return false;

    const method = 'track.search';
    const URL = `${this._makeUrl(method)}&q_artist=${artist}&q_track=${track}`;

    return new Promise((resolve, reject) => {
      const request = requestPromise(URL);
      request.then((data) => resolve(data.message.body)).catch((err) => reject(err));
    });
  }
}