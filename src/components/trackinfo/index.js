import React from 'react';
import PropTypes from 'prop-types';

const TrackInfo = ({ infoList, isVisible }) => {
	let classe = `track-info`;

	if (isVisible) {
		classe = `track-info js-active`;
	};

	return (
		<aside className={classe}>
			<nav className="level is-mobile">
				{infoList && infoList.map((el, idx) => (
					<div className="level-item has-text-centered" title={el.title} key={idx}>
						<div>
							<p className="heading">{el.legend}</p>
							<p className="title">{el.value}</p>
						</div>
					</div>
				))}
			</nav>
		</aside>
	);
};

TrackInfo.propTypes = {
	infoList: PropTypes.array,
	isVisible: PropTypes.bool,
};

TrackInfo.defaultProps = {
	infoList: [],
	isVisible: false,
};

export default TrackInfo;