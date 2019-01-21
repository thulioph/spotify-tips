import { GeniusApi } from './index';

describe('Genius API', () => {
  let Genius;
  let spyGetData;

  beforeEach(() => {
    Genius = new GeniusApi();
    spyGetData = jest.spyOn(Genius, 'getData');
  });

  test('Should have an url base when create a new instance.', () => {
    expect(Genius.urlBase).toEqual('https://api.genius.com');
  });

  test('Should return false if no apiPath were provided.', () => {
    expect(Genius.makeUrlFromApiPath()).toBeFalsy();
  });

  test('Should return the correct URL with the provided apiPath.', () => {
    const URL = Genius.makeUrlFromApiPath('path/123');
    expect(URL).toEqual('https://api.genius.com/path/123?access_token=ABC123');
  });

  test('Should return false if no query were provided.', () => {
    const URL = Genius.makeUrlFromQuery();
    expect(URL).toBeFalsy();
  });

  test('Should return the correct URL with the provided query.', () => {
    const URL = Genius.makeUrlFromQuery('Kendric Lamar');
    expect(URL).toEqual('https://api.genius.com/search?access_token=ABC123&q=Kendric%20Lamar');
  });

  test('Should return false if no requestUrl were provided.', () => {
    expect(Genius.getData()).toBeFalsy();
  });

  test('Should call the getData with the given requestUrl', () => {
    Genius.getData('my-request-url-to-api');

    expect(spyGetData).toHaveBeenCalledWith('my-request-url-to-api');
    expect(spyGetData).toHaveBeenCalledTimes(1);
  });
});