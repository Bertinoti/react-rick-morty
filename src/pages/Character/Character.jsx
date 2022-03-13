import React from 'react'
import { Component } from 'react';
import CharacterCard from '../../components/CharacterCard';
import EpisodeCard from '../../components/EpisodeCard';
import { getCharacter, getDataList } from '../../components/Functions/Functions';
import Layout from '../../components/Layout';

class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {
            characater: null,
            episodes: [],
            hasLoaded: false,
            hasError: false,
            errorMessage: null
        }

    }

    async componentDidMount() {
        this.loadCharacter();
    }

    async loadCharacter() {
        const charId = this.props.match.params.id;

        try {
            const dataCharacter = await getCharacter(charId);
            const dataEpisodes = await getDataList(dataCharacter.episode)
            console.log("dataCharacter >>>>>>>>", dataCharacter)
            console.log('dataEpisodes >>>>>>>>', dataEpisodes)

            this.setState({
                characater: dataCharacter,
                episodes: dataEpisodes,
                hasLoaded: true
            })
        }
        catch (error) {
            this.setState({
                hasLoaded: true,
                hasError: true,
                errorMessage: error.message,
            })
        }
    }


    render() {

        const { characater, episodes, hasLoaded, hasError, errorMessage } = this.state;

        return (
            <Layout>
                <section className="row">
                    {hasError && (
                        <div className='col-md-12'>
                            <h1>Error to load the Character </h1>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    {!hasLoaded && (
                        <div className='col-md-12'>
                            <h1>Loadind Character  ...</h1>
                        </div>
                    )}

                    {characater && (
                        <CharacterCard
                            key={characater.id}
                            id={characater.id}
                            name={characater.name}
                            image={characater.image}
                            species={characater.species}
                            status={characater.status}
                            origin={characater.origin}
                            location={characater.location}
                        />
                    )}
                </section>
                <section className='row'>
                    {hasError && (
                        <div className='col-md-12'>
                            <h1>Error to load the episodes </h1>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    {!hasLoaded && (
                        <div className='col-md-12'>
                            <h1>Loadind episodes  ...</h1>
                        </div>
                    )}

                    {episodes && (
                        <div className="col col-6">
                            <div className="row">
                                {
                                    episodes.map((episode) => (
                                        <EpisodeCard
                                            key={episode.id}
                                            id={episode.id}
                                            name={episode.name}
                                            airDate={episode.air_Date}
                                            episode={episode.episode}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )}
                </section>
            </Layout>
        )

    }

}

export default Character