import React from 'react';
import { Redirect } from 'react-router';
import SpotifyWrapper from 'spotify-wrapper-web-api';

// Theme
import { GridList } from 'material-ui/GridList';

import GridItem from 'components/griditem';
import Drawer from 'components/drawer';

import TrackProgress from 'components/trackprogress';

import Storage from 'utils/Storage';

// ====

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
    },
};

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
            openDrawer: false
        };

        this.storage = new Storage('spotify_tips');

        this.spotify = new SpotifyWrapper({
            token: this.storage.get().access_token
        });

        this.audio = null;

        this.hideTrackInfo = this.hideTrackInfo.bind(this);
        this.getTrackRecomendations = this.getTrackRecomendations.bind(this);
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

    displayTrackAudio(element = null, previewUrl) {
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

    getTrackRecomendations(trackID) {
        const tracks = this.spotify.user.recomendations('tracks', trackID);

        tracks.then(data => {
            this.setState({ 
                tracksPreviewList: data.tracks
            });

            this.openDrawer();
        });
    }

    handleTrackCardClicked(trackID, previewUrl) {
        this.getTrackRecomendations(trackID);
        // this.displayTrackAudio(previewUrl);
        // this.displayTrackInformation(trackID);
    }

    openDrawer = () => {
        this.setState({
            openDrawer: true
        });
    }

    handleDrawer = () => {
        this.setState({
            openDrawer: false
        });
    }

    render() {
        const { tracks, currentPreview, currentTime, userProfile, tracksPreviewList, openDrawer } = this.state;

        const access_token = this.storage.get().access_token;

        if (!access_token) {
            return( <Redirect to='/login' /> );
        }

        return(
            <div>
                <div style={styles.root}>    
                    <GridList style={styles.gridList} cols={5}>
                        {tracks && tracks.map(el => (
                            <GridItem 
                                key={el.id}
                                trackId={el.id}
                                previewUrl={el.preview_url}
                                trackImage={el.album.images[0].url}
                                trackName={el.name}
                                artistName={el.artists[0].name}
                                displayInfo={this.handleTrackCardClicked.bind(this)}
                            />
                        ))}
                    </GridList>

                    <Drawer 
                        open={openDrawer} 
                        handleClick={this.handleDrawer} 
                        content={tracksPreviewList}
                    />
                </div>

                <section className="track-progress">
                    <TrackProgress preview={currentPreview} time={currentTime} />
                </section>
            </div>
        )
    }
};

// ====

export default Home;