import React from 'react';

import TrackCard from '../../components/trackcard';
import TrackInfo from '../../components/trackinfo';

// ====

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tracks: [
                {
                    id: '6HlvqG97GN8m6Hd1DaMCSu',
                    preview_url: 'https://p.scdn.co/mp3-preview/79d822939de7dda0f639230f8dbe6d7262e74582',
                    image: 'https://i.scdn.co/image/0c86e9a48a303bbe940ad919553da5ec9e4d4ff9',
                    name: 'O Aprendiz',
                    artist: {
                        name: 'Diomedes Chinaski'
                    }
                },

                {
                    id: '6HlvqG97GN8m6Hd1DaMCSs',
                    preview_url: 'https://p.scdn.co/mp3-preview/79d822939de7dda0f639230f8dbe6d7262e74582',
                    image: 'https://i.scdn.co/image/0c86e9a48a303bbe940ad919553da5ec9e4d4ff9',
                    name: 'O Aprendiz',
                    artist: {
                        name: 'Diomedes Chinaski'
                    }
                },

                {
                    id: '6HlvqG97GN8m6Hd1DaMCS1',
                    preview_url: 'https://p.scdn.co/mp3-preview/79d822939de7dda0f639230f8dbe6d7262e74582',
                    image: 'https://i.scdn.co/image/0c86e9a48a303bbe940ad919553da5ec9e4d4ff9',
                    name: 'O Aprendiz',
                    artist: {
                        name: 'Diomedes Chinaski'
                    }
                }
            ],

            trackInfo: [
                { legend: 'danceability', value: '20%', title: 'Se a música é dançante' },
                { legend: 'danceability', value: '20%', title: 'Se a música é dançante' },
                { legend: 'danceability', value: '20%', title: 'Se a música é dançante' },
            ],

            displayInfo: false,
        };
    }

    handleTrackCardClicked(trackID, previewUrl) {
        console.warn(trackID, previewUrl);

        this.setState({
            displayInfo: !this.state.displayInfo
        });
    }

    render() {
        const { tracks, trackInfo, displayInfo } = this.state;

        return(
            <main className="container">
                <section className="section">
                    <h1 className="title">Home</h1>
                </section>

                <section className="section">
                    <ul className="section-list">
                        {tracks.map(el => (
                            <TrackCard 
                                key={el.id}
                                trackId={el.id}
                                previewUrl={el.preview_url}
                                trackImage={el.image}
                                trackName={el.name}
                                artistName={el.artist.name}
                                displayInfo={this.handleTrackCardClicked.bind(this)}
                            />
                        ))}
                    </ul>
                </section>

                <section className="section">
                    <TrackInfo infoList={trackInfo} isVisible={displayInfo} />
                </section>
                
                <section className="section"></section>
            </main>
        )
    }
};

// ====

export default Home;