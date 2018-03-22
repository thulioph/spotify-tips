class LastFM {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    request(params) {
        const urlBase = 'http://ws.audioscrobbler.com/2.0';
        const requestMethod = 'artist.getInfo';
        const format = 'json';
        
        const url = `${urlBase}/?method=${requestMethod}&api_key=${this.apiKey}&artist=${encodeURI(params)}&format=${format}`;

        const opts = {
            method: 'GET',
            timeout: 30 * 1000,
            json: true
        };

        return new Promise((resolve, reject) => {
            fetch(url, opts).then((response) => resolve(response.json())).catch((err) => reject(err))
        });
    }

    artistInfo(artistName) {
        return new Promise((resolve, reject) => {
            this.request(artistName).then((data) => resolve(data)).catch((err) => reject(err))
        });
    }
}

export default LastFM;