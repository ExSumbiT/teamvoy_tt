import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { PokemonService } from "../service/pokemon";

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            show: false,
            show_id: null,
            show_pokemon: null,
            pokemons: []
        };
        this.pokemonService = new PokemonService()

        this.showInfo = this.showInfo.bind(this)
    }

    componentDidMount() {
        this.pokemonService.getPokemons()
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        pokemons: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    showInfo(id) {
        if (this.state.show_id == id) {
            this.setState({ show: !this.state.show })
        }
        else {
            this.pokemonService.getPokemonById(id).then((result) => {
                console.log(result[0])
                this.setState({ show_pokemon: result[0] })
            })
            this.setState({ show_id: id, show: true })
        }
    }

    render() {
        const { error, isLoaded, pokemons } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container fluid className="bg-danger">
                    <Container style={{ height: "10vh" }}>
                        <p style={{ alignText: 'center' }}>Pokedex</p>
                    </Container>
                    <Row>
                        <Col xs={6}>
                            <Container fluid className='vertical-scrollable' style={{ overflowY: 'scroll', height: '90vh' }}>
                                <Row>
                                    {pokemons.map(pokemon => (
                                        <Col xs='4' key={pokemon.id}>
                                            <Card onClick={() => this.showInfo(pokemon.id)} border="danger" key={pokemon.id} style={{ width: '12rem' }}>
                                                <Card.Img variant="top" src={pokemon.image} />
                                                <Card.Body>
                                                    <Card.Title className="Title">{pokemon.name}</Card.Title>
                                                    <Card.Text className="Title">
                                                        {pokemon.type}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={6}>{this.state.show ? <Card style={{ width: '18rem', marginTop: 50, marginBottom: 50 }}>
                            < Card.Img variant="top" src={this.state.show_pokemon?.image} />
                            <Card.Body>
                                <Card.Title className="Title">{this.state.show_pokemon?.name} #{this.state.show_pokemon?.id}</Card.Title>
                                <Table bordered>
                                    <tbody>
                                        <tr>
                                            <td className='fixType'>Type</td>
                                            <td className="Title">{this.state.show_pokemon?.type}</td>
                                        </tr>
                                        <tr>
                                            <td>Attack</td>
                                            <td>{this.state.show_pokemon?.attack}</td>
                                        </tr>
                                        <tr>
                                            <td>Defense</td>
                                            <td>{this.state.show_pokemon?.defense}</td>
                                        </tr>
                                        <tr>
                                            <td>HP</td>
                                            <td>{this.state.show_pokemon?.hp}</td>
                                        </tr>
                                        <tr>
                                            <td>SP Attack</td>
                                            <td>{this.state.show_pokemon?.["special-attack"]}</td>
                                        </tr>
                                        <tr>
                                            <td>SP Defense</td>
                                            <td>{this.state.show_pokemon?.['special-defense']}</td>
                                        </tr>
                                        <tr>
                                            <td>Speed</td>
                                            <td>{this.state.show_pokemon?.speed}</td>
                                        </tr>
                                        <tr>
                                            <td>Weight</td>
                                            <td>{this.state.show_pokemon?.weight}</td>
                                        </tr>
                                        <tr>
                                            <td>Total moves</td>
                                            <td>{this.state.show_pokemon?.moves}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                            : null}</Col>
                    </Row >
                </Container >
            );
        }
    }
}

export default Pokedex;