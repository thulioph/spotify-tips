import React from 'react';
import { List, ListItem } from 'material-ui/List';

import Avatar from 'material-ui/Avatar';

import Play from 'material-ui/svg-icons/av/play-circle-filled';
import Pause from 'material-ui/svg-icons/av/pause-circle-filled';

// ====

class TrackItem extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            audio: null
        };
    }

    toggleAudio = (audioUrl) => {
        const { audio } = this.state;
        let newAudio;
        
        if (audio && audio.paused) {
            newAudio = audio.play();
        } else if (audio && !audio.paused) {
            newAudio = audio.pause();
        } else {
            newAudio = new Audio(audioUrl);
            newAudio.play();
        }
        
        this.setState({ audio: newAudio });
    }

    getCustomIcon = () => {
        const { audio } = this.state;

        let component = '';

        if (audio && !audio.paused) {
            component = <Pause />
        } else {
            component = <Play />
        }

        return component;
    }

    render() {
        const { trackName, trackArtist, trackImage, trackPreviewUrl } = this.props;

        let customIcon = this.getCustomIcon();

        return (
            <List>
                <ListItem
                    onClick={() => this.toggleAudio(trackPreviewUrl)}
                    leftAvatar={<Avatar src={trackImage} />}
                    rightIcon={customIcon}
                    primaryText={trackName}
                    secondaryText={trackArtist}
                />
            </List>
        )
    }
};

// ====

export default TrackItem;