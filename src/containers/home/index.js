import React from 'react';
import { Redirect } from 'react-router';
import SpotifyWrapper from 'spotify-wrapper-web-api';

// Theme
import { GridList } from 'material-ui/GridList';

import GridItem from 'components/griditem';
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
        };

        this.storage = new Storage('spotify_tips');

        this.spotify = new SpotifyWrapper({
            token: this.storage.get().access_token
        });

        this.audio = null;

        this.handleTrackCardClicked = this.handleTrackCardClicked.bind(this);
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

    handleTrackCardClicked(track) {
        const { history } = this.props;
        history.push(`track/${track.trackId}/info`, { track });
        
        // this.displayTrackAudio(previewUrl);
        // this.displayTrackInformation(trackID);
    }

    render() {
        const { tracks, currentPreview, currentTime, userProfile } = this.state;

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
                                displayInfo={this.handleTrackCardClicked}
                            />
                        ))}
                    </GridList>
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