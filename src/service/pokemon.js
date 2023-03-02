export class PokemonService {


    getPokemons(limit=12) {
        const promises = [];
        for (let i = 1; i <= limit; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then(res => res.json()));
        }

        const pokemons = Promise.all(promises).then(results => {
            const pokemon = results.map(data => ({
                name: data.name,
                id: data.id,
                image: data.sprites["front_default"],
                type: data.types.map(type => type.type.name).join(", "),
            }));
            return pokemon
        });
        return pokemons;
        // return fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`).then(res => res.json())
    }

    getPokemonsByType(type) {
        return fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(res => res.json().pokemon)
    }

    getPokemonById(id) {
        const promises = [fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())];
        const pokemonStat = Promise.all(promises).then(result => {
            const stat = result.map(data => ({
                type: data.types.map(type => type.type.name).join(", "),
            }));
            return stat
        })
        return pokemonStat
    }


}
