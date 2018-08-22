class MusicBrainz {
    request(params) {
        const urlBase = 'https://musicbrainz.org/ws/2';
        const requestMethod = 'artist';
        const format = 'json';
        const mbidNumber = params;
        const incrementation = 'aliases';

        const url = `${urlBase}/${requestMethod}/${mbidNumber}?inc=${incrementation}&fmt=${format}`;

        const opts = {
            method: 'GET',
            json: true
        };

        return new Promise((resolve, reject) => {
            fetch(url, opts).then((response) => resolve(response.json())).catch((err) => reject(err))
        });
    }

    artistInfo(mbid) {
        return new Promise((resolve, reject) => {
            this.request(mbid).then((data) => resolve(data)).catch((err) => reject(err))
        });
    }
}

export default MusicBrainz;