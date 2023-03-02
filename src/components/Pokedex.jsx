import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
                                        <Col xs='auto' key={pokemon.id}>
                                            <Card onClick={() => this.showInfo(pokemon.id)} border="danger" key={pokemon.id} style={{ width: '12rem' }}>
                                                <Card.Img variant="top" src={pokemon.image} />
                                                <Card.Body>
                                                    <Card.Title>{pokemon.name}</Card.Title>
                                                    <Card.Text>
                                                        {pokemon.type}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={6}>{this.state.show ? <p>{this.state.show_id}</p> : null}</Col>
                    </Row >
                </Container >
            );
        }
    }
}

export default Pokedex;