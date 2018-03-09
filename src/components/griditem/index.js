import React from 'react';

import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ActionInfo from 'material-ui/svg-icons/action/info';

// ====

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
};

// ====

const GridTileActionIcon = ({ displayInfo, trackId, previewUrl }) => {
    return(
        <div>
            <IconButton onClick={(evt) => displayInfo(trackId, previewUrl)}>
                <ActionInfo color="rgb(0, 188, 212)" />
            </IconButton>
        </div>
    )
};

// ====

const GridItem = (props) => {
    const { trackId, trackImage, trackName, artistName } = props;

    return (
        <GridTile
            key={trackId}
            title={trackName}
            subtitle={<span>by <b>{artistName}</b></span>}
            actionIcon={<GridTileActionIcon {...props} />}
            titleStyle={styles.titleStyle}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)">

            <img src={trackImage} alt={artistName} />
        </GridTile>
    )
};

// ====

export default GridItem;