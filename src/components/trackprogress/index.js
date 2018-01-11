import React from 'react';
import PropTypes from 'prop-types';

// ====

const TrackProgress = (props) => {
    const { time } = props;

    const styleObj = {
        width: time,
    };

    return (
        <div className='loading-bar' style={styleObj}></div>
    );
};

TrackProgress.propTypes = {
    time: PropTypes.string
};

// ====

export default TrackProgress;