import { useEffect, useState } from 'react'

import { pokemonApi } from '../api/pokemonApi'
import { PokemonResponse, Result, SimplePokemon } from '../interfaces/PokemonInterfaces';


export const usePokemonSearch = () => {
    
    const [isFetching, setFetching] = useState(true);

    const [searchListPokemon, setSearchListPokemon] = useState<SimplePokemon[]>([]);
    

    const loadPokemons= async()=>{
        const res = await pokemonApi.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=1200");
        mapSimplePokemon(res.data.results)
    }

    const mapSimplePokemon =( list: Result[]  )=>{

        const newListPokemon: SimplePokemon[] = list.map( ({ name,url })=>{

            const urlSplit = url.split('/');
            const id = urlSplit[urlSplit.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return{ id, name, picture }

        }) 

        setSearchListPokemon(newListPokemon);

        setFetching(false)
    }

    useEffect(() => {
        
        loadPokemons();

    }, [])

    return {
        isFetching,
        searchListPokemon,
        
    }
}
