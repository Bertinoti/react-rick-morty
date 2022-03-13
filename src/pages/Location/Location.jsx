import React, { Component } from 'react'
import CharacterCard from '../../components/CharacterCard';
import { getDataList, getLocation } from '../../components/Functions/Functions';
import Layout from '../../components/Layout';
import { Button } from 'react-bootstrap';

class Location extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: null,
            residents: [],
            hasLoaded: false,
            hasError: false,
            errorMessage: null,
        }
    }

    async componentDidMount() {
        this.loadlocation()
    }

    async loadlocation() {

        const locId = this.props.match.params.id;
        console.log(locId)

        try {
            const location = await getLocation(locId);
            const residents = await getDataList(location.residents)
            console.log(residents)

            console.log(location)
            this.setState({
                location,
                residents,
                hasLoaded: true
            })
        } catch (error) {
            this.setState({
                hasError: true,
                hasLoaded: true,
                errorMessage: error.message
            })
        }
    }

    render() {
        const { location, residents, hasLoaded, hasError, errorMessage } = this.state;
        console.log(residents)

        return (
            <Layout>
                <section className='row'>
                    {hasError && (
                        <div className='col-md-12'>
                            <h1> Error to Load Location</h1>
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    {!hasLoaded && (
                        <div className='col-md-12'>
                            <h1>Loading Location</h1>
                        </div>
                    )}

                    {location && (
                        <>
                            <div className='row'>
                            <div className='row'>
                                <h3>Location NAME: </h3>  <h4>{location.name} </h4>
                            </div>
                            <div className='row'>
                                <h3>Location TYPE  </h3>  <h4> {location.type}</h4>
                            </div>
                            <div className='row'>
                                <h3>Location DIMENSION</h3>  <h4> {location.dimension}</h4>
                            </div>
                            </div>
                        </>
                    )}
                </section>
                <section className="row">
                    <div className="col col-12">
                        <hr />
                    </div>
                    <div className="col col-12">
                        <h4>Residents:</h4>
                    </div>
                    <div className="col col-12">
                        <hr />
                    </div>
                    {residents.length > 0 &&
                        residents.map((resident) => (
                            <CharacterCard
                                key={resident.id}
                                id={resident.id}
                                image={resident.image}
                                name={resident.name}
                                species={resident.species}
                                status={resident.status}
                                origin={resident.origin.name}
                                location={resident.location}
                            />
                        ))}
                </section>

            </Layout>
        )

    }
}

export default Location