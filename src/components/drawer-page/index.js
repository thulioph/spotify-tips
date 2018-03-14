import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';

import TrackItem from 'components/trackitem';

// ====

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    grid: {
        width: '50%',
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
        const { docked = true, open, handleClick = null, content, seed } = this.props;

        return (
            <div>
                <Drawer
                    docked={docked}
                    width={'100%'}
                    open={open}
                    onRequestChange={(open) => handleClick()}>

                    <section style={styles.root}>
                        <article style={styles.grid}>
                            { seed ? this.renderSeed(seed) : null }
                        </article>
                        
                        <article style={styles.grid}>
                            <Subheader>Você pode curtir</Subheader>

                            {content.map(el => (
                                <TrackItem
                                    key={el.id}
                                    isVisible={true}
                                    trackName={el.name}
                                    trackArtist={el.album.artists[0].name}
                                    trackImage={el.album.images[0].url}
                                    trackPreviewUrl={el.preview_url || null}
                                />
                            ))}
                        </article>
                    </section>

            </Drawer>
            </div>
        );
    }
};

// ====

export default DrawerPage;