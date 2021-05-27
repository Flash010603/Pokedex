import { useEffect, useState } from "react"
import { pokemonApi } from "../api/pokemonApi";
import { PokemonFull } from "../interfaces/PokemonInterfaces";


export const usePokemon = (id:string) => {
    
    const [isLoading, setisLoading] = useState(true);
    const [pokemon, setPokemon] = useState<PokemonFull>( {} as PokemonFull )


    const loadPokemon = async() =>{
        const res = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(res.data);
        setisLoading(false);        
    }

    useEffect(() => {
        
        loadPokemon()

    }, [])

    
    return {
        isLoading,
        pokemon
    }
}
