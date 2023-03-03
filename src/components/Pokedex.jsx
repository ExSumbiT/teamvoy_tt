import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { PokemonService } from "../service/pokemon";

const colors = {
    grass: "#d2f2c2",
    poison: "#f7cdf7",
    fire: "#ffd1b5",
    flying: "#eae3ff",
    water: "#c2f3ff",
    bug: "#e0e8a2",
    normal: "#e6e6c3",
    electric: "#fff1ba",
    ground: "#e0ccb1",
    fighting: "#fcada9",
    psychic: "#ffc9da",
    rock: "#f0e09c",
    fairy: "#ffdee5",
    steel: "#e6eaf0",
    ice: "#e8feff",
    ghost: "#dbbaff",
    dragon: "#c4bdff"
};

class Pokedex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 12,
            error: null,
            isLoaded: false,
            show: false,
            show_id: null,
            show_pokemon: null,
            el: null,
            types: [],
            pokemons: []
        };
        this.pokemonService = new PokemonService()

        this.showInfo = this.showInfo.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    pokeRef = React.createRef();

    componentDidMount() {
        this.pokemonService.getPokemonTypes().then(result => {
            this.setState({ types: result })
            console.log(result)
        })
        this.pokemonService.getPokemons(this.state.limit)
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

    loadMore() {
        this.setState({ isLoaded: true });
        this.pokemonService.getPokemons(this.state.limit + 12)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        pokemons: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        this.setState({ limit: this.state.limit + 12 })
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
        const { error, isLoaded, pokemons, types } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <Container fluid>
                    <Container style={{ height: "7vh", margin: '10px auto' }}>
                        <h1 className="logo">Pokedex</h1>
                    </Container>
                    <Row>
                        <Col xs={6}>
                            <Form.Select style={{ height: '5vh', width: '100%' }} aria-label="Select pokemon type">
                                <option key='all' value={null}>All</option>
                                {types.map(type => (
                                    <option key={type.name} value={type.name} className={`Title bg-${type.name}`}>
                                        {/* <Badge as='p' key={type} bg='' className={`me-1 bg-${type.name}`}> */}
                                        {type.name}
                                        {/* </Badge> */}
                                    </option>))}
                            </Form.Select>
                            <Container fluid className='vertical-scrollable' style={{ overflowY: 'scroll', height: '80vh' }}>
                                <Row>
                                    {pokemons.map(pokemon => (
                                        <Col xs={12} md={4} sm={12} key={pokemon.id}>
                                            <Card onClick={() => this.showInfo(pokemon.id)} className='bg' border="black" key={pokemon.id} >
                                                <Card.Img variant="top" src={pokemon.image} />
                                                <Card.Body>
                                                    <Card.Title className="Title">{pokemon.name}</Card.Title>
                                                    <Card.Text className="Title">
                                                        {pokemon.type.split(', ').map(type => (<Badge key={type} bg='' className={`me-1 bg-${type}`} >{type}</Badge>))}
                                                        {/* {pokemon.type.split(', ').map(type => (<Badge bg='' className='me-1' style={{ backgroundColor: colors[type], color: 'black' }} >{type}</Badge>))} */}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Container>
                            <Button onClick={this.loadMore} style={{ height: '5vh', width: '100%' }} variant="primary">Load More</Button>
                        </Col>
                        <Col xs={6}>{this.state.show ? <Card xs={2} style={{ width: 'fit-content', marginTop: 'auto', marginBottom: 'auto' }}>
                            < Card.Img className="card-big-img-top" variant="top" src={this.state.show_pokemon?.image} />
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