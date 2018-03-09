import React from 'react';
import Drawer from 'material-ui/Drawer';

import TrackItem from 'components/trackitem';

// ====

const DrawerComponent = ({open, handleClick, content}) => {
    return (
        <div>
            <Drawer
                docked={false}
                width={'30%'}
                open={open}
                onRequestChange={(open) => handleClick()}
            >
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