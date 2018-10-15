import { LastFM } from './index';

describe('LastFM API', () => {
  let ApiLastFM;
  let spyRequest;
  let spyArtistInfo;

  beforeEach(() => {
    ApiLastFM = new LastFM({ apiKey: 'abc' });
    spyRequest = jest.spyOn(ApiLastFM, 'request');
    spyArtistInfo = jest.spyOn(ApiLastFM, 'artistInfo');
  });

  test('Should have an apiKey as undefined', () => {
    const ApiLastFM = new LastFM({});
    expect(ApiLastFM.apiKey).toBeUndefined()
  });

  test('Should have an apiKey entry with the received value', () => {
    expect(ApiLastFM.apiKey).toEqual('abc');
  });

  test('Should have an urlBase when called the constructor', () => {
    expect(ApiLastFM.urlBase).toEqual('https://ws.audioscrobbler.com/2.0');
  });

  test('Should have an artist.getInfo as a requestMethod value.', () => {
    expect(ApiLastFM.requestMethod).toEqual('artist.getInfo');
  });

  test('Should return false if no artist were given to request method.', () => {
    const request = ApiLastFM.request();
    expect(request).toBeFalsy();
  });

  test('Should call the request method with the given artist.', () => {
    ApiLastFM.request('my-request-url');
    expect(spyRequest).toHaveBeenCalledTimes(1);
    expect(spyRequest).toHaveBeenCalledWith('my-request-url');
  });

  test('Should return false if no artist were given for makeUrl method.', () => {
    const URL = ApiLastFM.makeUrl();
    expect(URL).toBeFalsy();
  });

  test('Should return the correct URL with the given artist.', () => {
    const artist = 'kendric';
    const requestUrl = ApiLastFM.makeUrl(artist);
    expect(requestUrl).toEqual(`https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=abc&artist=${artist}&format=json`);
  });

  test('Should not call artistInfo if no name were given', () => {
    const artistInfo = ApiLastFM.artistInfo();

    expect(artistInfo).toBeFalsy();
    expect(spyArtistInfo).toHaveBeenCalledTimes(1);
  });

  test('Should not call artistInfo if no name were given', () => {
    ApiLastFM.artistInfo('kendric');

    expect(spyArtistInfo).toHaveBeenCalledTimes(1);
    expect(spyArtistInfo).toHaveBeenCalledWith('kendric');
  });
});