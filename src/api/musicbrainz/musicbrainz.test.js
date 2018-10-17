import { MusicBrainz } from './index';

describe('MusicBrainz API', () => {
  let MusicBrainzApi;
  let spyMakeUrl;

  beforeEach(() => {
    MusicBrainzApi = new MusicBrainz();
    spyMakeUrl = jest.spyOn(MusicBrainzApi, '_makeUrl');
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

  test('Should return false if no mbid were provided.', () => {;
    expect(MusicBrainzApi._makeUrl()).toBeFalsy();
  });

  test('Should return the correct URL with the given mbid.', () => {
    const mbid = '123ABC';
    const requestUrl = MusicBrainzApi._makeUrl(mbid);
    expect(requestUrl).toEqual(`https://musicbrainz.org/ws/2/artist/${mbid}?inc=aliases&fmt=json`);
  });

  test('Should return false if no mbid were given.', () => {
    expect(MusicBrainzApi.artistInfo()).toBeFalsy();

    expect(spyMakeUrl).not.toHaveBeenCalled();
  });

  test('Should call artistInfo with the given mbid.', () => {
    MusicBrainzApi.artistInfo('123ABC');

    expect(spyMakeUrl).toHaveBeenCalledWith('123ABC');
    expect(spyMakeUrl).toHaveBeenCalledTimes(1);
  });
});