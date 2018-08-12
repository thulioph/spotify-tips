import Xray from 'x-ray';

const filterTrim = (value) => {
    return typeof value === "string" ? value.trim() : value;
};

const parseYoutubeIdFilter = (value) => {
    if (value && typeof value === 'string') {
        if (value.match(/youtube/)) {
            return value.split('embed/')[1].split('?')[0];
        }
    }

    return false;
};

const parseTimeFilter = (value) => {
    if (value && typeof value === 'string') {
        return value
            .split('at')[1]
            .split('(and')[0]
            .trim();
    }

    return false;
};

class WhoSampled {
    constructor() {
        this.sampleData = {
            metaData: {
                kind: '.section-header .section-header-title | trim'
            },
            dest: {
                name: '#sampleWrap_dest  .trackName | trim',
                artist: '#sampleWrap_dest .sampleTrackArtists | trim',
                release: '#sampleWrap_dest .release-name a',
                year: '#sampleWrap_dest .trackLabel span + span',
                label: '#sampleWrap_dest .trackLabel span',
                image: '#sampleWrap_dest .sampleTrackImage img@src',
                appearsAt: '.dest-timing',
                youtubeId: '.embed-dest iframe@src | parseYoutubeId'
            },
            source: {
                name: '#sampleWrap_source  .trackName | trim',
                artist: '#sampleWrap_source .sampleTrackArtists | trim',
                release: '#sampleWrap_source .release-name a',
                year: '#sampleWrap_source .trackLabel span + span',
                label: '#sampleWrap_source .trackLabel span',
                image: '#sampleWrap_source .sampleTrackImage img@src',
                appearsAt: '.source-timing',
                youtubeId: '.embed-source iframe@src | parseYoutubeId'
            },
        };

        this.api_url = 'http://www.whosampled.com/search';
        
        this.x = Xray({
            filters: {
                trim: filterTrim,
                parseYoutubeId: parseYoutubeIdFilter,
                parseTime: parseTimeFilter,
            }
        });
    }

    sample(url) {
        return new Promise((resolve, reject) => {
            this.x(url, this.sampleData)((err, result) => err ? reject(err) : resolve(result))
        });
    }

    getSamples(query) {
        const url = `${this.api_url}/connections/?q=${encodeURIComponent(query)}`;

        return new Promise((resolve, reject) => {
            this.x(url, {
                songs: this.x('li.listEntry', [{ sampleUrl: 'a@href'}])
            })((err, result) => {
                if (err) {
                    return reject(err);
                }

                const songs = result.songs.map(item => this.sample(item.sampleUrl));
                
                resolve(
                    Promise.all(songs).then(values => values)
                );
            });
        });
    }
}

export default WhoSampled;
