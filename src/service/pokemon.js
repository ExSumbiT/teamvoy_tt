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
                image: data.sprites.other["official-artwork"]["front_default"],
                type: data.types.map(type => type.type.name).join(", "),
            }));
            return pokemon
        });
        return pokemons;
    }

    getPokemonsByType(type) {
        return fetch(`https://pokeapi.co/api/v2/type/${type}/`).then(res => res.json().pokemon)
    }

    getPokemonTypes() {
        const promises = [fetch(`https://pokeapi.co/api/v2/type`).then(res => res.json())];
        const pokemonTypes = Promise.all(promises).then(result => {
            const type = result[0].results.map(data => ({name: data.name}));
            return type
        })
        return pokemonTypes
    }

    getPokemonById(id) {
        const promises = [fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())];
        const pokemonStat = Promise.all(promises).then(result => {
            const stat = result.map((data) => {
                let info = {
                    name: data.name,
                    id: this.lpad(data.id, 3),
                    image: data.sprites.other["official-artwork"]["front_default"],
                    type: data.types.map(type => type.type.name).join(", "),
                    weight: data.weight,
                    moves: data.moves.length}
                data.stats.map(s => (info[s.stat.name] = s.base_stat))
                return info
            });
            return stat
        })
        return pokemonStat
    }

    lpad(value, padding) {
        var zeroes = new Array(padding+1).join("0");
        return (zeroes + value).slice(-padding);
    }


}
