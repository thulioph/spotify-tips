import React from 'react';

import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';
import Chip from 'material-ui/Chip';

import TrackItem from 'components/trackitem';

// ====


const handleActive = (tab) => {
    console.warn(`A tab with this route property ${tab} was activated.`);
};

// ====

const styles = {
    link: {
        display: 'block'
    },
    chip_wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '20px 0',
    },
    figure: {
        margin: '20px 0',
        border: '1px solid white',
    },
    paragraph: {
        padding: '20px',
    },
    chip: {
        margin: 4,
    },
};

const renderArtistInfo = (el, bio) => {
    return(
        <div key={el.id}>
            <h2>{el.name}</h2>

            <h3>Followers: {el.followers.total}</h3>

            <a style={styles.link} href={el.external_urls.spotify} target="_blank" rel="noopener">Abrir no Spotify</a>

            <div style={styles.chip_wrapper}>
                {el.genres.map((gender, idx) => (
                    <Chip
                        key={idx}
                        onRequestDelete={() => console.warn('delete')}
                        onClick={() => console.warn('clicked')}
                        style={styles.chip}>
                        
                        {gender}
                    </Chip>
                ))}
            </div>

            <figure style={styles.figure}>
                <img src={el.images[0].url} alt="" />
            </figure>

            <p style={styles.paragraph} dangerouslySetInnerHTML={{__html: bio}}></p>
        </div>
    )
};

const filterByPopularity = (arr) => arr.sort((a, b) => b.popularity - a.popularity)[0];

const DrawerTabs = ({ artistInfo, relatedSongs, artistBio }) =>  {
    return(
        <Tabs>
            <Tab label="Artist Bio" >
                <div>
                    <Subheader>Conheça mais sobre o artista</Subheader>

                    {artistInfo ? renderArtistInfo(filterByPopularity(artistInfo), artistBio) : null }
                </div>
            </Tab>

            <Tab label="Related Songs" onActive={handleActive}>
                <div>
                    <Subheader>Você pode curtir</Subheader>

                    {relatedSongs && relatedSongs.map(el => (
                        <TrackItem
                            key={el.id}
                            isVisible={true}
                            trackName={el.name}
                            trackArtist={el.album.artists[0].name}
                            trackImage={el.album.images[0].url}
                            trackPreviewUrl={el.preview_url || null}
                        />
                    ))}
                </div>
            </Tab>
        </Tabs>
    )
};

// ====

export default DrawerTabs;