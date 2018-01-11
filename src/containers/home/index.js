import React from 'react';
import SpotifyWrapper from 'spotify-wrapper';

import TrackCard from '../../components/trackcard';
import TrackInfo from '../../components/trackinfo';
import TrackProgress from '../../components/trackprogress';

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
        };

        this.spotify = new SpotifyWrapper({
            token: 'BQAzSlXTk-In7SRnGg4fZqiyYcj_mXOH2Hnqrj3qd9gQqfOY9_KE-SDOJic03Xgk2fMa66_dAlf-Mcp4UyvGPHsMhsSY7xAW36gnhL2kCaY59mYviAfTdif0p2n9zPFV3W5dW-r6obtLtQ0cR1Vxc_I'
        });
    }

    componentDidMount() {
        const topTracks = this.spotify.user.topTracks();
        topTracks.then(track => this.setState({ tracks: track.items }));
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

        setTimeout(() => this.setState({ displayInfo: false }), 30001);
    }

    displayTrackAudio(previewUrl) {
        let audio = new Audio(previewUrl);
        audio.play();

        audio.addEventListener('timeupdate', (e) => {
            const currentTime = Math.floor(e.target.currentTime);
            const duration = Math.floor(e.target.duration);

            this.setState({
                currentTime: `${(100 - (duration - currentTime))}%`
            });
        });
    }

    handleTrackCardClicked(trackID, previewUrl) {
        this.displayTrackInformation(trackID);
        this.displayTrackAudio(previewUrl);
    }

    render() {
        const { tracks, trackInfo, displayInfo, currentPreview, currentTime } = this.state;

        return(
            <main className="container">
                <section className="section">
                    <h1 className="title">Home</h1>
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

                <section className="section">
                    <TrackInfo infoList={trackInfo} isVisible={displayInfo} />
                </section>

                <section className="section track-progress">
                    <TrackProgress preview={currentPreview} time={currentTime} />
                </section>
            </main>
        )
    }
};

// ====

export default Home;