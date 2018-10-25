import { Spotify } from './index';

describe('Spotify API', () => {
  let SpotifyApi;
  let spyRequest;

  beforeEach(() => {
    SpotifyApi = new Spotify({ token: 'ABC123' });
    spyRequest = jest.spyOn(SpotifyApi, '_request');
  });

  test('Should have a spotifyApi when create a new instance.', () => {
    expect(SpotifyApi.spotifyApi.token).toEqual({ token: 'ABC123' })
  });

  test('Should return false if no artistName were given.', () => {
    expect(SpotifyApi.getArtistProfile()).toBeFalsy();
    expect(spyRequest).not.toHaveBeenCalled();
  });

  test('Should call getArtistProfile with the given artistName.', () => {
    SpotifyApi.getArtistProfile('Kendric Lamar');
    expect(spyRequest).toHaveBeenCalledTimes(1);
  });

  test('Should return false if no trackId were given.', () => {
    expect(SpotifyApi.getTrackRecomendations()).toBeFalsy();
  });

  test('Should call getTrackRecomendations with the given trackId.', () => {
    SpotifyApi.getTrackRecomendations('123CBA');
    expect(spyRequest).toHaveBeenCalledTimes(1);
  });

  test('Should call getUserTopTracks only once.', () => {
    SpotifyApi.getUserTopTracks();
    expect(spyRequest).toHaveBeenCalledTimes(1);
  });

  test('Should call getUserProfile only once.', () => {
    SpotifyApi.getUserProfile();
    expect(spyRequest).toHaveBeenCalledTimes(1);
  });
});