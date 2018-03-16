import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';

import TrackItem from 'components/trackitem';
import DrawerTabs from 'components/drawer-tabs';

// ====

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    grid: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
    },
};

class DrawerPage extends React.Component {
    renderSeed = ({ trackName, artistName, trackImage, previewUrl }) => {
        return (
            <div>
                <Subheader>Artista Principal</Subheader>

                <TrackItem
                    isVisible={true}
                    trackName={trackName}
                    trackArtist={artistName}
                    trackImage={trackImage}
                    trackPreviewUrl={previewUrl}
                />
            </div>
        )
    }

    render() {
        const { docked = true, open, handleClick = null, content, seed, artistInfo, handleClose, artistBio } = this.props;
        
        if (Object.keys(seed).length <= 0) {
            return null;
        }

        return (
            <div>
                <Drawer
                    docked={docked}
                    width={'100%'}
                    open={open}
                    onRequestChange={(open) => handleClick()}>

                    <button onClick={() => handleClose()}>Fechar</button>

                    <section style={styles.root}>
                        <article style={styles.grid}>
                            { seed ? this.renderSeed(seed) : null }
                        </article>
                        
                        <article style={styles.grid}>
                        {
                                artistBio && artistBio.bio 
                                    ? 
                                        <DrawerTabs 
                                            artistInfo={artistInfo} 
                                            relatedSongs={content}
                                            artistBio={artistBio && artistBio.bio}
                                            artistSimilar={artistBio && artistBio.similar}
                                        />
                                    : null
                        }
                        </article>
                    </section>
                </Drawer>
            </div>
        );
    }
};

// ====

export default DrawerPage;