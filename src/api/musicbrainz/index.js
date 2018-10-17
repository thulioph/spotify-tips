import axios from 'axios';

export class MusicBrainz {
	constructor() {
		this.urlBase = 'https://musicbrainz.org/ws/2';
		this.requestMethod = 'artist';
		this.incrementation = 'aliases';
	}

	request(url) {
		if (!url) return false;

		return new Promise((resolve, reject) => {
			axios.get(url).then(success => resolve(success)).catch(err => reject(err));
		});
	}

	makeUrl(mbId = null) {
		if (!mbId) return false;
		return `${this.urlBase}/${this.requestMethod}/${mbId}?inc=${this.incrementation}&fmt=json`;
	}

	artistInfo(mbId = null) {
		if (!mbId) return false;

		const requestUrl = this.makeUrl(mbId);

		return new Promise((resolve, reject) => {
				const request = this.request(requestUrl);
				request.then((data) => resolve(data)).catch((err) => reject(err));
		});
	}
}
