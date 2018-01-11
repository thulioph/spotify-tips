import React from 'react';
import PropTypes from 'prop-types';

// ====

const TrackCard = (props) => {
    const { trackId, previewUrl, trackImage, trackName, artistName, displayInfo } = props;

    return (
        <article className='section-list_item' onClick={() => displayInfo(trackId, previewUrl)}>
            <figure className='track-image'>
                <img src={trackImage} alt={trackName} />

                <figcaption>
                    <h2>{trackName}</h2>
                    <span>{artistName}</span>
                </figcaption>
            </figure>
        </article>
    );
};

TrackCard.propTypes = {
    trackId: PropTypes.string,
    previewUrl: PropTypes.string,
    trackImage: PropTypes.string,
    trackName: PropTypes.string,
    artistName: PropTypes.string,
    displayInfo: PropTypes.func,
};

// ====

export default TrackCard;