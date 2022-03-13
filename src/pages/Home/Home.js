import React, { Component } from "react";

import Layout from "../../components/Layout";
import { GetApiPage, getEpisodes } from "../../components/Functions/Functions";

import EpisodeCard from "../../components/EpisodeCard";
import Pagination from "../../components/Pagination/Pagination";
import { EPISODE, HOME } from "../../constants/routes";
import { Link, NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
      paginationInfo: null,
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    this.loadEpisodes();
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.page !== this.props.match.params.page) this.loadEpisodes();
  }


  async loadEpisodes() {

    const page = +this.props.match.params.page;

    try {
      const alldata = await getEpisodes(page);

      this.setState({
        episodes: alldata.results,
        paginationInfo: alldata.info,
        hasLoaded: true,
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
    const { hasError, hasLoaded, episodes, errorMessage, paginationInfo } = this.state;
    const page = + this.props.match.params.page;

    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              id={episode.id}
              name={episode.name}
              airDate={episode.air_date}
              episode={episode.episode}
            />
          ))}
          <div className="col col-12 ">
            <hr />
          </div>
          {paginationInfo && (hasLoaded) && (
            <div className="col col-12 d-flex justify-content-around">
              <NavLink className={`btn btn-primary col-md-3 ${Boolean(paginationInfo.prev) ? null : "disabled"}`} to={`${HOME}${page - 1}`} isActive={() => Boolean(paginationInfo.prev)}>Previous</NavLink>
              <NavLink className={`btn btn-primary col-offset-1 col-md-3 ${Boolean(paginationInfo.next) ? null : "disabled"}`} to={`${HOME}${page + 1}`} isActive={() => Boolean(paginationInfo.next)}>Next</NavLink>
            </div>
          )}
        </section>
      </Layout>
    );
  }
}

export default Home;
