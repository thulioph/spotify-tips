import React from 'react';
import PropTypes from 'prop-types';

// ====

const TrackPreview = (props) => {
    const { isVisible, trackName, trackImage, trackArtist, trackPreviewUrl } = props;

    let classe = `box track-preview`;

    if (isVisible) {
        classe = `box track-preview js-active`
    }

    return(
        <div className={classe}>
            <article className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img src={trackImage} alt={trackName} />
                    </figure>
                </div>

                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>{trackName}</strong>

                            <small>{trackArtist}</small> 

                            {   trackPreviewUrl ? 
                                    <audio src={trackPreviewUrl} controls>
                                        Your browser not support audio
                                    </audio>
                                : null
                            }
                        </p>
                    </div>
                </div>
            </article>
        </div>
    )
};

TrackPreview.propTypes = {
    isVisible: PropTypes.bool,
    trackName: PropTypes.string,
    trackImage: PropTypes.string,
    trackArtist: PropTypes.string,
    trackPreviewUrl: PropTypes.string,
};

// ====

export default TrackPreview;