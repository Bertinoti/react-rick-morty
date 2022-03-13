import React, { Component } from "react";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import { getDataList, getEpisode } from "../../components/Functions/Functions";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
    episode: null,
    characters: [],
    hasLoaded: false,
    hasError: false,
    errorMessage: null,
    }
  }

  async componentDidMount() {
    this.loadEpisode();
  }

  async loadEpisode() {

    const id = (this.props.match.params.id);

    try {
      const alldataepisode = await getEpisode(id);
      const alldataCharacters = await getDataList(alldataepisode.characters);

      this.setState({
        episode: alldataepisode.id,
        characters: alldataCharacters,
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
    const {episode, characters, hasError, hasLoaded, errorMessage} = this.state;
    return (
      <Layout>
        <section className="row">
          <div className="col col-6">
            <div className="row">
            {characters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                species={character.species}
                status={character.status}
                origin={character.origin}
                location={character.location}
              />
            ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Episode;
