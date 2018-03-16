class Lyrics {
    constructor(params) {
        this.urlBase = 'https://api.musixmatch.com/ws/1.1';
        this.apiKey = 'd95b640665bfafd624f6b975e8ba91ce';
    }

    request(url) {
        const opts = {
            method: 'GET',
            json: true
        };

        return new Promise((resolve, reject) => {
            fetch(url, opts)
                .then((response) => resolve(response.json()))
                .catch((err) => reject(err))
        });
    }

    getLyrics(trackId) {
        const method = 'track.lyrics.get';
        const url = `${this.urlBase}/${method}?track_id=${trackId}&apikey=${this.apiKey}`;

        return new Promise((resolve, reject) => {
            this.request(url)
                .then((data) => resolve(data.message.body))
                .catch((err) => reject(err))
        });
    }
    
    getTrackInfo({ artist, track }) {
        const method = 'track.search';
        const url = `${this.urlBase}/${method}?q_artist=${artist}&q_track=${track}&apikey=${this.apiKey}`;

        return new Promise((resolve, reject) => {
            this.request(url)
                .then((data) => resolve(data.message.body))
                .catch((err) => reject(err))
        });
    }
}

export default Lyrics;