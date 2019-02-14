import SpotifyWrapper from 'spotify-wrapper-web-api';

export class Spotify {
  constructor(token) {
    this.spotifyApi = new SpotifyWrapper({ token });
  }

  _request(promiseRequest) {
    return new Promise((resolve, reject) => {
      promiseRequest
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  getUserTopTracks() {
    const topTracks = this.spotifyApi.user.topTracks();
    this._request(topTracks);
  }

  getUserProfile() {
    const userProfile = this.spotifyApi.user.profile();
    this._request(userProfile);
  }

  getArtistProfile(artistName) {
    if (!artistName) return false;

    const artistProfile = this.spotifyApi.search.artists(artistName);
    return this._request(artistProfile);
  }

  getTrackRecomendations(trackId) {
    if (!trackId) return false;

    const tracksRecomendation = this.spotifyApi.user.recomendations('tracks', trackId);
    this._request(tracksRecomendation);
  }
}