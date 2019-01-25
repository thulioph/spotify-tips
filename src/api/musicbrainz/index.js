import { requestPromise } from '../helpers';

export class MusicBrainz {
	constructor() {
		this.urlBase = 'https://musicbrainz.org/ws/2';
		this.requestMethod = 'artist';
		this.incrementation = 'aliases';
	}

	_makeUrl(mbId) {
		if (!mbId) return false;

		return `${this.urlBase}/${this.requestMethod}/${mbId}?inc=${this.incrementation}&fmt=json`;
	}

	artistInfo(mbId) {
		if (!mbId) return false;

		const requestUrl = this._makeUrl(mbId);

		return new Promise((resolve, reject) => {
			const request = requestPromise(requestUrl);
				request.then((data) => resolve(data));
				request.catch((err) => reject(err));
		});
	}
}
