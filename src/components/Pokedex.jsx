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
            pokemons: []
        };
        this.pokemonService = new PokemonService()
    }

    componentDidMount() {
        this.pokemonService.getPokemons()
            .then(
                (result) => {
                    console.log(result)
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

    render() {
        const { error, isLoaded, pokemons } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container>
                    <Row>
                        <Col xs={6}>
                            {pokemons.map(pokemon => (
                                <Card style={{ width: '13rem' }}>
                                    <Card.Img variant="top" src={pokemon.image} />
                                    <Card.Body>
                                        <Card.Title>{pokemon.name}</Card.Title>
                                        <Card.Text>
                                            {pokemon.type}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Col>
                        <Col xs={6}>xs=6</Col>
                    </Row>
                </Container>
            );
        }
    }
}

export default Pokedex;