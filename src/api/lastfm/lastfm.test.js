import { LastFM } from './index';

describe('LastFM API', () => {
  let ApiLastFM;
  let spyMakeUrl;

  beforeEach(() => {
    ApiLastFM = new LastFM({ apiKey: 'abc' });
    spyMakeUrl = jest.spyOn(ApiLastFM, '_makeUrl');
  });

  test('Should not have an apiKey if nothing is passed.', () => {
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

  test('Should return false if _makeUrl were called without an artist.', () => {
    const URL = ApiLastFM._makeUrl();
    expect(URL).toBeFalsy();
  });

  test('Should return the correct URL with the given artist.', () => {
    const artist = 'kendric';
    const requestUrl = ApiLastFM._makeUrl(artist);
    expect(requestUrl).toEqual(`https://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=abc&artist=${artist}&format=json`);
  });

  test('Should return false if no artistInfo were given', () => {
    const artistInfo = ApiLastFM.artistInfo();
    expect(artistInfo).toBeFalsy();

    expect(spyMakeUrl).not.toHaveBeenCalled();
  });

  test('Should call artistInfo if a name were given', () => {
    ApiLastFM.artistInfo('kendric');

    expect(spyMakeUrl).toHaveBeenCalledWith('kendric');
    expect(spyMakeUrl).toHaveBeenCalledTimes(1);
  });
});