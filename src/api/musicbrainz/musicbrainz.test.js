import { MusicBrainz } from './index';

describe('MusicBrainz API', () => {
  let MusicBrainzApi;
  let spyRequest;
  let spyArtistInfo;

  beforeEach(() => {
    MusicBrainzApi = new MusicBrainz();
    spyRequest = jest.spyOn(MusicBrainzApi, 'request');
    spyArtistInfo = jest.spyOn(MusicBrainzApi, 'artistInfo');
  });

  test('Should have an url base when create a new instance.', () => {
    expect(MusicBrainzApi.urlBase).toEqual('https://musicbrainz.org/ws/2');
  });

  test('Should have a requestMethod when create a new instance.', () => {
    expect(MusicBrainzApi.requestMethod).toEqual('artist');
  });

  test('Should have a incrementation when create a new instance.', () => {
    expect(MusicBrainzApi.incrementation).toEqual('aliases');
  });

  test('Should return false if no url is provided.', () => {
    const request = MusicBrainzApi.request();
    expect(request).toBeFalsy();
  });

  test('Should return false if no mbid were provided.', () => {
    expect(MusicBrainzApi.makeUrl()).toBeFalsy();
  });

  test('Should return the correct URL with the given mbid.', () => {
    const mbid = '123ABC';
    const requestUrl = MusicBrainzApi.makeUrl(mbid);
    expect(requestUrl).toEqual(`https://musicbrainz.org/ws/2/artist/${mbid}?inc=aliases&fmt=json`);
  });

  test('Should not call artistInfo if no mbid were given.', () => {
    expect(MusicBrainzApi.artistInfo()).toBeFalsy();
    expect(spyArtistInfo).toHaveBeenCalledTimes(1);
  });

  test('Should call artistInfo with the given mbid.', () => {
    MusicBrainzApi.artistInfo('123ABC');

    expect(spyArtistInfo).toHaveBeenCalledTimes(1);
    expect(spyArtistInfo).toHaveBeenCalledWith('123ABC');
  });
});