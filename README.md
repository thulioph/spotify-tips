# Spotity tips

[![Build Status](https://travis-ci.org/thulioph/spotify-tips.svg?branch=tests)](https://travis-ci.org/thulioph/spotify-tips) [![Coverage Status](https://coveralls.io/repos/github/thulioph/spotify-tips/badge.svg?branch=master)](https://coveralls.io/github/thulioph/spotify-tips?branch=master)


This project is a study case of integration between the [Spotify Wrapper API](https://github.com/thulioph/spotify-wrapper) and React components. You can see a live demo [here](https://spotify-tips.herokuapp.com).

## Local Setup

```shell
$ yarn install 
$ yarn start
```

## Technologies

- React
- React Router
- Create React App
- Jest + Enzyme + Chai + Sinon
- Bulma

## License

[MIT License](http://thulioph.mit-license.org/)

## Roadmap

- [x] Obter mais informações sobre o artista, utilizando a api do [musicbrainz](https://wiki.musicbrainz.org/Development)
    - https://wiki.musicbrainz.org/Development/JSON_Web_Service (webservice)
    - exibir informações sobre a área onde ele iniciou a carreira (begin_area)
    - exibir o nome verdadeiro (aliases)
    - status da vida (se tá morto, se tá vivo, life-span)
    - entendendo a api do [musicbrainz](https://musicbrainz.org/doc/Style/)
    - entendendo o **mbid** (https://musicbrainz.org/doc/MusicBrainz_Identifier)
- [x] Obter informacoes sobre a letra da música utilizando a api do [musixmatch](https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get)
- [ ] Outra alternativa para obter a letra da música (https://github.com/rhnvrm/lyric-api)