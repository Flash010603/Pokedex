import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import { ThemeContext } from '../context/ThemeContext';
import { SimplePokemon } from '../interfaces/PokemonInterfaces'
import ImageColors from "react-native-image-colors"

import { useNavigation } from '@react-navigation/core';

interface Props {
    pokemon: SimplePokemon
}

const width = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon}: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);

    const [bgColor, setBgColor] = useState('gray');

    const isMounted = useRef(true);

    const nav = useNavigation();
    

    useEffect(() => {
        isMounted.current = true;
        ImageColors.getColors(pokemon.picture, { fallback: 'gray' }).then((colors) => {

            if (!isMounted.current) return;

            if (colors.platform === "android") {

                const dominantColor = colors.average || 'gray';
                setBgColor(dominantColor)
            } else {

                const backgroundColor = colors.background || 'gray'
                setBgColor(backgroundColor)
            }
        })


        return () => {
            isMounted.current = false;
        }

    }, [])

    const handleNavigate = (color:string)=>{
        nav.navigate("PokemonDetailsScreen", { simplePokemon:pokemon, color });
        console.log(bgColor)
    }
 

    return (
        <TouchableOpacity
            activeOpacity={.8}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>handleNavigate(bgColor)}
        >
            <View style={[style.containerCard, { backgroundColor: bgColor, width: width * .8 }]}>
                <View style={{paddingTop: 15, paddingLeft:15, flexDirection:'column-reverse', justifyContent:'space-between'}}>
                    <Text style={[style.text]}>- {pokemon.name} -</Text>
                    <Text style={[style.text, { backgroundColor:'black', borderRadius:100, width: 100, textAlign:'center'}]}> {pokemon.id} </Text>
                </View>

                <Image
                    source={{ uri: pokemon?.picture }}
                    style={[style.img]}
                />

                <View style={{ width:200, height:200,position: 'absolute', bottom:0, overflow:'hidden'}}>
                    <Image
                        source={(colors.background === 'black' ? require('../assets/pokebola-blanca.png') : require('../assets/pokebola.png'))}
                        style={style.imgBack}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    imgBack:{
        width: 200,
        height: 200,
        position: 'absolute',
        right:50,
        bottom: -50,
        opacity: 0.15
    },
    text:{
        fontSize:25,
        // fontWeight:'bold',
        letterSpacing: 2,
        color: 'white',
        textTransform:'capitalize'
    },
    img: {
        width: 190,
        height: 180,
        bottom: -25,
        right: -120,
        zIndex: 1
    },
    containerCard: {
        // height: 200,
        borderRadius: 10,
        marginBottom: 45,

    }
})