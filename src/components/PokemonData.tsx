import React, { useContext } from 'react'
import { View, Text, ScrollView, Image } from 'react-native'
import { ThemeContext } from '../context/ThemeContext';
import { PokemonFull } from '../interfaces/PokemonInterfaces'

interface Props{
    pokemon:PokemonFull
}

export const PokemonData = ({pokemon}:Props) => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <View>
            <Text>{pokemon.base_experience}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Image
                    source={{uri: pokemon.sprites.front_default}}
                    style={{width:150,height:150}}
                />
                <Image
                    source={{uri: pokemon.sprites.back_default}}
                    style={{width:150,height:150}}
                />
                <Image
                    source={{uri: pokemon.sprites.front_shiny}}
                    style={{width:150,height:150}}
                />
                <Image
                    source={{uri: pokemon.sprites.back_shiny}}
                    style={{width:150,height:150}}
                />
            </ScrollView>
        </View>
    )
}

