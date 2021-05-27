import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ThemeContext } from '../context/ThemeContext'
import Icon from 'react-native-vector-icons/Ionicons';

import { RootStackParams } from '../navigation/Tab1'
import { usePokemon } from '../hooks/usePokemon'
import { PokemonData } from '../components/PokemonData'


interface Props extends StackScreenProps<RootStackParams, 'PokemonDetailsScreen'> { }

export const PokemonDetailsScreen = ({ navigation, route }: Props) => {

    const { theme: { colors } } = useContext(ThemeContext);

    const { name, id, picture } = route.params.simplePokemon;

    const { isLoading, pokemon } = usePokemon(id);

    return (
        <>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ overflow: 'hidden' }}>

                    <TouchableOpacity
                        style={{ ...style.btnBack, backgroundColor: colors.background }}
                        onPress={() => navigation.goBack()}
                    >
                        <Icon name="arrow-back-outline" color={colors.text} style={{ ...style.icon }} />
                    </TouchableOpacity>

                    <View style={{ ...style.containerPokemon, backgroundColor: route.params.color }}>
                        <Image
                            source={{ uri: picture }}
                            style={[style.img]}
                        />

                        <Image
                            source={(colors.background === 'black' ? require('../assets/pokebola-blanca.png') : require('../assets/pokebola.png'))}
                            style={{
                                width: 300,
                                height: 300,
                                position: 'absolute',
                                right: 25,
                                bottom: -50,
                                opacity: .1,
                                zIndex: 9
                            }}
                        />
                    </View>

                    <Text style={[style.text, { color: colors.text }]}>{name}</Text>

                    {
                        (isLoading)
                            ? <ActivityIndicator
                                style={{ height: 100 }}
                                color="red"
                                size={30}
                            />
                            : <PokemonData pokemon={pokemon} />
                    }

                </View>
            </ScrollView>
        </>
    )
}
const style = StyleSheet.create({
    btnBack: {
        width: 65,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 40,
        marginLeft: 15,
        zIndex: 11,
        borderRadius: 100
    },
    icon: {
        fontSize: 50,
    },
    containerPokemon: {
        height: 450,
        width: '100%',
        zIndex: 10,
        borderBottomLeftRadius: 1000,
        borderBottomRightRadius: 1000,
        overflow: 'hidden'
    },
    text: {
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    img: {
        position: 'absolute',
        width: 300,
        height: 300,
        bottom: '15%',
        left: '46%',
        transform: [{
            translateX: -150
        }],
        zIndex: 500
    },
})