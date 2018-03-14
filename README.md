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

- [ ] Obter informações sobre o artista utilizando a api do [Last.fm](https://github.com/feross/last-fm#lastfmartistinfoopts-err-data--)
    - api_key do last.fm === '09348b1f3d5b4f6be5f9002755bf0587'
    - exibir informações da bio e artistas similares
    - a api vai me retornar o **mbid** do artista, com esse número eu consigo realizar requests na api do **musicbrainz**.
- [ ] Obter mais informações sobre o artista, utilizando a api do [musicbrainz](https://wiki.musicbrainz.org/Development)
    - http://musicbrainz.org/ws/2/artist/[51af0b6a-083a-4da7-99ee-3a94843269c2]?inc=aliases&fmt=json (MBID é o número que está entre colchetes)
    - https://wiki.musicbrainz.org/Development/JSON_Web_Service (webservice)
    - exibir informações sobre a área onde ele iniciou a carreira (begin_area)
    - exibir o nome verdadeiro (aliases)
    - status da vida (se tá morto, se tá vivo, life-span)
    - entendendo a api do [musicbrainz](https://musicbrainz.org/doc/Style/)
    - entendendo o **mbid** (https://musicbrainz.org/doc/MusicBrainz_Identifier)
- [ ] Obter informacoes sobre a letra da música utilizando a api do [musixmatch](https://developer.musixmatch.com/documentation/api-reference/track-lyrics-get)
- [ ] Outra alternativa para obter a letra da música (https://github.com/rhnvrm/lyric-api)