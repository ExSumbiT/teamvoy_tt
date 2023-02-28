export class PokemonService {


    getPokemons(limit=12) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`).then(res => res.json())
    }

    getPokemonsByType(type) {
        return fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(res => res.json().pokemon)
    }

    getPokemonById(id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    }


}
