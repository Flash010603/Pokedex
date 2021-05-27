import { useEffect, useRef, useState } from 'react'

import { pokemonApi } from '../api/pokemonApi'
import { PokemonResponse, Result, SimplePokemon } from '../interfaces/PokemonInterfaces';


export const usePokemonPaginater = () => {
    
    const [isLoading, setIsLoading] = useState(true);

    const [listPokemon, setListPokemon] = useState<SimplePokemon[]>([]);
    
    const url = useRef('https://pokeapi.co/api/v2/pokemon?limit=20')

    const loadPokemons= async()=>{
        const res = await pokemonApi.get<PokemonResponse>(url.current);
        url.current= res.data.next;
        mapSimplePokemon(res.data.results)
    }

    const mapSimplePokemon =( list: Result[]  )=>{

        const newListPokemon: SimplePokemon[] = list.map( ({ name,url })=>{

            const urlSplit = url.split('/');
            const id = urlSplit[urlSplit.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`


            return{ id, name, picture }

        }) 

        setListPokemon([...listPokemon, ...newListPokemon]);

        setIsLoading(false)
    }

    useEffect(() => {
        
        loadPokemons();

    }, [])

    return {
        isLoading,
        listPokemon,
        loadPokemons
    }
}
