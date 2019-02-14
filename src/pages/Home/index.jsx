import React from 'react';
import {
  GeniusApi,
  LastFM,
  Spotify as SpotifyApi,
  MusicBrainz,
  Lyrics as LyricsApi
} from '../../api';

const CodeBox = ({ children }) => (
  <code style={{
    padding: '20px',
    lineHeight: '28px',
    display: 'inline-block',
    maxHeight: '200px',
    overflowX: 'scroll',
    backgroundColor: '#EEE'
  }}>
    {children}
  </code>
);

const HomePage = ({ spotify, lastFm, genius, musicBrainz, lyrics }) => {
  return(
    <React.Fragment>
      <h1>Home</h1>
      <p>Here's all the information provided by the API's:</p>

      {spotify && <aside>
        <h3>Spotify</h3>
        <CodeBox>{JSON.stringify(spotify)}</CodeBox>
      </aside>}

      {lastFm && <aside>
        <h3>LastFM</h3>
        <CodeBox>{JSON.stringify(lastFm)}</CodeBox>
      </aside>}

      {genius && <aside>
        <h3>Genius</h3>
        <CodeBox>{JSON.stringify(genius)}</CodeBox>
      </aside>}

      {musicBrainz && <aside>
        <h3>MusicBrainz</h3>
        <CodeBox>{JSON.stringify(musicBrainz)}</CodeBox>
      </aside>}

      {lyrics && <aside>
        <h3>Lyrics</h3>
        <CodeBox>{JSON.stringify(lyrics)}</CodeBox>
      </aside>}
    </React.Fragment>
  );
}

const withData = (WrappedComponent) => {
  return class withData extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        artist: "kendrick lamar",
        track: "DNA",
        trackId: "128564154",
      };

      this.genius = new GeniusApi();
      this.lastfm = new LastFM({
        apiKey: 'ba17ae297648b7eac4fcd2ee053ad0be'
      });
      this.spotify = new SpotifyApi('BQDK-zVQ5Ikp7GrduIW773hFakNgBlFeGL7wdHys17BoEiriGlXQobruzmDS_JZaiUmF7VYzOV-hWa3xMPjoneEEDcDjVg1MXlI3uHG3wYmEKOBzO3s1fs6QuEIo0fZjBbqfoCGjcExyha8');
      this.musicbrainz = new MusicBrainz();
      this.lyrics = new LyricsApi({ 
        apiKey: 'd95b640665bfafd624f6b975e8ba91ce'
      });
    }

    getGenius = () => {
      const { artist } = this.state;

      const geniusUrl = this.genius.makeUrlFromQuery(artist);
      const geniusData = this.genius.getData(geniusUrl);

      geniusData.then(({ data }) => {
        const list = data.response.hits;
        this.setState({ genius: list });
      });

      geniusData.catch(error => {
        console.error('Error =>', error);
      });
    }

    getLastfm = () => {
      const { artist } = this.state;

      const lastData = this.lastfm.artistInfo(artist);

      lastData.then(({ data }) => {
        const artist = data.artist;
        this.setState({ lastFm: artist });
        this.getMusicBrainz(artist.mbid);
      });

      lastData.catch(error => {
        console.error('Error => ', error);
      });
    }

    getSpotify = () => {
      const { artist } = this.state;

      const spotifyData = this.spotify.getArtistProfile(artist);

      spotifyData.then(({ artists }) => {
        const items = artists || artists.items;
        this.setState({ spotify: items });
      });

      spotifyData.catch(error => {
        console.error('Error =>', error);
      });
    }

    getMusicBrainz = (mbid) => {
      const musicData = this.musicbrainz.artistInfo(mbid);

      musicData.then(({ data }) => {
        this.setState({ musicBrainz: data });
      });

      musicData.catch(errror => {
        console.error("Errror => ", errror);
      });
    }

    getLyrics = () => {
      const { trackId } = this.state;

      const lyricsData = this.lyrics.getLyrics(trackId);

      lyricsData.then(result => {
        this.setState({ lyrics: result.lyrics });
      });

      lyricsData.catch(error => {
        console.error("Error => ", error);
      });
    }

    componentDidMount() {
      // this.getSpotify();
      this.getLastfm();
      this.getGenius();
      this.getLyrics();
    }

    render() {
      return(
        <WrappedComponent {...this.state} {...this.props} />
      );
    }
  };
}

export default withData(HomePage);