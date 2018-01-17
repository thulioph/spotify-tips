import React from 'react';
import { Redirect } from 'react-router';
import SpotifyWrapper from 'spotify-wrapper';

import TrackCard from '../../components/trackcard';
import TrackProgress from '../../components/trackprogress';
import TrackPreview from '../../components/trackpreview';

import Storage from '../../utils/Storage';

// ====

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [],
            trackInfo: [],
            displayInfo: false,
            currentPreview: '',
            currentTime: '',
            userProfile: {},
            tracksPreviewList: [],
        };

        this.storage = new Storage('spotify_tips');

        this.spotify = new SpotifyWrapper({
            token: this.storage.get().access_token
        });

        this.audio = null;

        this.hideTrackInfo = this.hideTrackInfo.bind(this);
        this.getTrackRecomendations = this.getTrackRecomendations.bind(this);
        this.displayRecommendedTracks = this.displayRecommendedTracks.bind(this);
    }

    componentDidMount() {
        const topTracks = this.spotify.user.topTracks();
        topTracks.then(track => this.setState({ tracks: track.items }));

        const requestProfile = this.spotify.user.profile();
        requestProfile.then(data => {
            this.setState((prevState) => {
                return { 
                    userProfile: Object.assign(prevState, data) 
                };
            })
        });
    }

    hideTrackInfo() {
        this.setState({ displayInfo: false });
    }

    handleTrackFeatures(obj) {
        let arr = [];

        Object.keys(obj).forEach(el => {
            if (el === 'danceability') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música é dançante' // mais próximo de 1.0 é dançante
                });
            }

            if (el === 'energy') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música é energética' // mais próximo de 1.0 é enérgica
                });
            }

            if (el === 'mode') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música é melódica' // mais próximo de 1.0 é melódica
                });
            }

            if (el === 'speechiness') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música tem palavras faladas' // mais próximo de 1.0 tem
                });
            }

            if (el === 'liveness') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música é ao vivo' // acima de 0.8 é ao vivo
                });
            }

            if (el === 'valence') {
                arr.push({
                    legend: [el],
                    value: `${Math.round(obj[el] * 100)}%`,
                    title: 'Se a música tem uma vibe positiva' // mais próximo de 1.0 é positiva (feliz, eufórica)
                });
            }
        });

        this.setState({ trackInfo: arr });
    }

    displayTrackInformation(trackID) {
        const trackFeatures = this.spotify.audio.features(trackID);

        trackFeatures.then(data => {
            this.handleTrackFeatures(data);

            this.setState({ displayInfo: true });
        });

        this.hideTrackInfo();
    }

    displayTrackAudio(element, previewUrl) {
        if (this.audio) {
            this.audio.pause();
        }

        this.audio = new Audio(previewUrl);
        this.audio.play();

        this.audio.addEventListener('timeupdate', (e) => {
            const currentTime = Math.floor(e.target.currentTime);
            const duration = Math.floor(e.target.duration);

            this.setState({ currentTime: `${(100 - (duration - currentTime))}%` });
        });

        this.audio.addEventListener('ended', (e) => {
            // element.classList.remove('js-active');
            this.setState({ currentTime: '0%' });
            
            this.audio = null;
            
            this.hideTrackInfo();
        });
    }

    setTrackAsActive(element) {
        const tracks = document.querySelectorAll('.section-list_item');
        tracks.forEach(el => el.classList.remove('js-active'));

        element.classList.add('js-active');
    }

    displayRecommendedTracks() {
        const element = document.querySelector('.track-preview-wrapper');
        const container = document.querySelector('.container');

        element.classList.add('js-active');
        container.classList.add('js-active');
    }

    getTrackRecomendations(trackID) {
        const tracks = this.spotify.user.recomendations('tracks', trackID);

        tracks.then(data => {
            this.setState({ 
                tracksPreviewList: data.tracks
            });

            this.displayRecommendedTracks();
        });
    }

    handleTrackCardClicked(evt, trackID, previewUrl) {
        const { currentTarget } = evt;

        this.setTrackAsActive(currentTarget);

        this.getTrackRecomendations(trackID);
        this.displayTrackAudio(currentTarget, previewUrl);
        
        // this.displayTrackInformation(trackID);
    }

    render() {
        const { tracks, displayInfo, currentPreview, currentTime, userProfile, tracksPreviewList } = this.state;

        const access_token = this.storage.get().access_token;

        if (!access_token) {
            return( <Redirect to='/login' /> );
        }

        return(
            <div>
                <main className="container">
                    <section className="section">
                        <div className="container">
                            <h1 className="title">Olá <strong>{userProfile.display_name}!</strong></h1>
                            <h2 className="subtitle">
                                Essas foram as <strong>{tracks.length} músicas</strong> que você mais ouviu até hoje. <br />
                                Conheça <strong>novas músicas</strong> com base na <strong>que você clicar</strong>.
                            </h2>
                        </div>
                    </section>

                    <section className="section">
                        <ul className="section-list">
                            {tracks && tracks.length && tracks.map(el => (
                                <TrackCard 
                                    key={el.id}
                                    trackId={el.id}
                                    previewUrl={el.preview_url}
                                    trackImage={el.album.images[0].url}
                                    trackName={el.name}
                                    artistName={el.artists[0].name}
                                    displayInfo={this.handleTrackCardClicked.bind(this)}
                                />
                            ))}
                        </ul>
                    </section>
                </main>

                <section className="section track-preview-wrapper">
                    {tracksPreviewList.map(el => (
                        <TrackPreview
                            key={el.id}
                            isVisible={displayInfo}
                            trackName={el.name}
                            trackArtist={el.album.artists[0].name}
                            trackImage={el.album.images[0].url}
                            trackPreviewUrl={el.preview_url || null}
                        />
                    ))};
                </section>

                <section className="track-progress">
                    <TrackProgress preview={currentPreview} time={currentTime} />
                </section>
            </div>
        )
    }
};

// ====

export default Home;