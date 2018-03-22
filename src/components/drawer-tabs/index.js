import React from 'react';

import Subheader from 'material-ui/Subheader';
import { Tabs, Tab } from 'material-ui/Tabs';

import TrackItem from 'components/trackitem';

// ====


const handleActive = (tab) => {
    console.warn(`A tab with this route property ${tab} was activated.`);
};

// ====

const style = {
    link: {
        display: 'block'
    }
};

const DrawerTabs = ({ artistBio, relatedSongs }) =>  {
    return(
        <Tabs>
            <Tab label="Artist Bio" >
                <div>
                    <Subheader>Conheça mais sobre o artista</Subheader>

                    {artistBio && artistBio.map(el => (
                        <div key={el.id}>
                            <h2>{el.name} <span>{el.followers.total}</span></h2>
                            
                            <a style={style.link} href={el.external_urls.spotify} target="_blank" rel="noopener">Abrir no Spotify</a>

                            {el.genres.map((gender, idx) => (
                                <h4 key={idx}>{gender}</h4>
                            ))}

                            <figure>
                                <img src={el.images[0].url} alt=""/>
                            </figure>
                        </div>
                    ))}
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