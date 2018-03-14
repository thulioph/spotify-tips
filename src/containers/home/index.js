import React from 'react';
import { Redirect } from 'react-router';
import SpotifyWrapper from 'spotify-wrapper-web-api';

import { GridList } from 'material-ui/GridList';
import Snackbar from 'material-ui/Snackbar';

import GridItem from 'components/griditem';
import DrawerPage from 'components/drawer-page';

import Storage from 'utils/Storage';

// ====

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginLeft: '0%'
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
            userProfile: {},
            seedArtist: {},
            openDrawer: false,
            tracksPreviewList: [],
            snackActive: false,
            snackMessage: '',
        };

        this.storage = new Storage('spotify_tips');

        this.spotify = new SpotifyWrapper({
            token: this.storage.get().access_token
        });

        this.getUserTopTracks = this.getUserTopTracks.bind(this);
        this.getUserProfile = this.getUserProfile.bind(this);
        this.displaySnackBar = this.displaySnackBar.bind(this);
        this.getTrackRecomendations = this.getTrackRecomendations.bind(this);
        this.changeSeedArtist = this.changeSeedArtist.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.handleTrackCardClicked = this.handleTrackCardClicked.bind(this);
    }

    componentDidMount() {
        this.getUserTopTracks();
        this.getUserProfile();
    }

    getUserTopTracks() {
        const topTracks = this.spotify.user.topTracks();
        topTracks.then(track => {
            this.setState({ tracks: track.items });
        });
    }

    getUserProfile() {
        const requestProfile = this.spotify.user.profile();

        requestProfile.then(data => {
            this.setState((prevState) => {
                return {
                    userProfile: Object.assign(prevState, data)
                };
            });

            this.displaySnackBar(`Hello ${this.state.userProfile.display_name}`);
        });
    }

    displaySnackBar(message = '') {
        this.setState({ 
            snackActive: !this.state.snackActive,
            snackMessage: message
        });
    }

    getTrackRecomendations(trackID) {
        const tracks = this.spotify.user.recomendations('tracks', trackID);

        tracks.then(data => {
            this.setState({
                tracksPreviewList: data.tracks
            });

            this.openDrawer();
            this.displaySnackBar('Recomendações prontas!');
        });
    }

    openDrawer() {
        this.setState({ openDrawer: true });
    }

    changeSeedArtist(track) {
        this.setState({ seedArtist: track });
    }

    handleTrackCardClicked(track) {
        this.getTrackRecomendations(track.trackId);
        this.changeSeedArtist(track);
    }

    render() {
        const { tracks, tracksPreviewList, openDrawer, seedArtist, snackActive, snackMessage } = this.state;

        const access_token = this.storage.get().access_token;

        if (!access_token) {
            return( <Redirect to='/login' /> );
        }

        return(
            <div>
                <DrawerPage
                    open={openDrawer}
                    content={tracksPreviewList}
                    seed={seedArtist || null}
                />

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

                <Snackbar
                    open={snackActive}
                    message={snackMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.displaySnackBar}
                />
            </div>
        )
    }
};

// ====

export default Home;