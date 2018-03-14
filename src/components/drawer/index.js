import React from 'react';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';

import TrackItem from 'components/trackitem';

// ====

const renderSeed = ({ trackName, artistName, trackImage, previewUrl}) => {
    return(
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
};

const DrawerComponent = ({ docked = true, open, handleClick = null, content, seed }) => {
    return (
        <div>
            <Drawer
                docked={docked}
                width={'20%'}
                open={open}
                onRequestChange={(open) => handleClick()}>
                
                { seed ? renderSeed(seed) : null }

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
                ))};
            </Drawer>
        </div>
    );
}

// ====

export default DrawerComponent;