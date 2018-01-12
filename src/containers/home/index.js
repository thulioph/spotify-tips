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
            token: 'BQC8RENz0YriU84E24SiOGxSt8D0A_cy21sz_F5XJNTQwC7QYvgWHdOaRM1TN1SSTDGJdVYRgmwkFQ9zGj9ovCaissT5Zq44aE5vS05XGYlaeWJA443XqdgLwiswTR6dtsTZzODQwtEaUNkYWufif7A'
        });

        this.audio = null;
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
            element.classList.remove('js-active');
            this.setState({ currentTime: '0%' });
            this.audio = null;
        });
    }

    setTrackAsActive(element) {
        const tracks = document.querySelectorAll('.section-list_item');
        tracks.forEach(el => el.classList.remove('js-active'));

        element.classList.add('js-active');
    }

    handleTrackCardClicked(evt, trackID, previewUrl) {
        const { currentTarget } = evt;

        this.setTrackAsActive(currentTarget);

        this.displayTrackInformation(trackID);
        this.displayTrackAudio(currentTarget, previewUrl);
    }

    render() {
        const { tracks, trackInfo, displayInfo, currentPreview, currentTime } = this.state;

        let cTimer = currentTime.replace('%', '');
        let containerClass = `container`;

        if (cTimer > 0) {
            containerClass = `container js-active`;
        }

        return(
            <main className={containerClass}>
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