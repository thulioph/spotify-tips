import { Lyrics } from './index';

describe('Lyrics API', () => {
  let LyricsAPI;
  let spyMakeUrl;

  beforeEach(() => {
    LyricsAPI = new Lyrics({ apiKey: '123ABC' });
    spyMakeUrl = jest.spyOn(LyricsAPI, '_makeUrl');
  });

  test('Should not have an apiKey if nothing is provided.', () => {
    const LyricsAPI = new Lyrics({});
    expect(LyricsAPI.apiKey).toBeUndefined();
  });

  test('Should return an apiKey with a received value.', () => {
    expect(LyricsAPI.apiKey).toEqual('123ABC');
  });

  test('Should have an urlBase when called the constructor.', () => {
    expect(LyricsAPI.urlBase).toEqual('https://api.musixmatch.com/ws/1.1');
  });

  test('Should return false if _makeUrl were called without an artist.', () => {
    const URL = LyricsAPI._makeUrl();
    expect(URL).toBeFalsy();
  });

  test('Should return false if no trackID were provided for getLyrics method.', () => {
    expect(LyricsAPI.getLyrics()).toBeFalsy();
    expect(spyMakeUrl).not.toHaveBeenCalled();
  });

  test('Should call getLyrics with the correct method if a trackId were provided.', () => {
    LyricsAPI.getLyrics('123ID');
    expect(spyMakeUrl).toHaveBeenCalledWith('track.lyrics.get');
    expect(spyMakeUrl).toHaveBeenCalledTimes(1);
  });

  test('Should return false if no artist were provided for getTrackInfo method.', () => {
    expect(LyricsAPI.getTrackInfo({})).toBeFalsy();
    expect(spyMakeUrl).not.toHaveBeenCalled();
  });

  test('Should call getTrackInfo with the correct method if an artist and track were provided.', () => {
    LyricsAPI.getTrackInfo({
      artist: 'kendric',
      track: 'DNA',
    });

    expect(spyMakeUrl).toHaveBeenCalledWith('track.search');
    expect(spyMakeUrl).toHaveBeenCalledTimes(1);
  });
});