import React from 'react';
import SpotifyWrapper from 'spotify-wrapper-web-api';

import Drawer from 'components/drawer';
import Storage from 'utils/Storage';

// ====

class TrackInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tracksPreviewList: [],
            openDrawer: false,
            displayInfo: false,
            trackInfo: []
        };

        this.storage = new Storage('spotify_tips');

        this.spotify = new SpotifyWrapper({
            token: this.storage.get().access_token
        });

        this.getTrackRecomendations = this.getTrackRecomendations.bind(this);
        this.handleDrawer = this.handleDrawer.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.displayTrackInformation = this.displayTrackInformation.bind(this);
        this.handleTrackFeatures = this.handleTrackFeatures.bind(this);
        this.hideTrackInfo = this.hideTrackInfo.bind(this);
    }

    openDrawer() {
        this.setState({ openDrawer: true });
    }

    handleDrawer() {
        this.setState({ openDrawer: false });
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

    getTrackRecomendations(trackID) {
        const tracks = this.spotify.user.recomendations('tracks', trackID);

        tracks.then(data => {
            this.setState({
                tracksPreviewList: data.tracks
            });

            this.openDrawer();
        });
    }

    componentDidMount() {
        const { location } = this.props.history;

        if (location) {
            this.getTrackRecomendations(location.state.track.trackId);
            this.displayTrackInformation(location.state.track.trackId);
        }
    }

    render() {
        const { tracksPreviewList, openDrawer, displayInfo, trackInfo } = this.state;

        return(
            <div>
                <section>
                    <Drawer
                        open={openDrawer}
                        handleClick={this.handleDrawer}
                        content={tracksPreviewList}
                    />
                </section>

                <section>
                    {displayInfo && trackInfo.map((el, idx) => (
                        <div key={idx}>
                            <h1>{el.title} - {el.value}</h1>
                        </div>
                    ))}
                </section>
            </div>
        )
    }
};

// ====

export default TrackInfo;