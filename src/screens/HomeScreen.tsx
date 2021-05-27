import React, { useContext } from 'react'
import { Text, Image, FlatList, ActivityIndicator, View } from 'react-native'
import { color } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../components/PokemonCard';

import { ThemeContext } from '../context/ThemeContext';
import { usePokemonPaginater } from '../hooks/usePokemonPaginater';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { theme: { colors } } = useContext(ThemeContext);

    const { listPokemon, isLoading, loadPokemons } = usePokemonPaginater();

    return (

        <>

            <Image
                source={(colors.background === 'black' ? require('../assets/pokebola-blanca.png') : require('../assets/pokebola.png'))}
                style={{
                    width: 300,
                    height: 300,
                    position: 'absolute',
                    right: -100,
                    top: -70,
                    opacity: 0.25

                }}
            />


            <View style={{alignItems:'center', justifyContent:'center',width: '100%'}}>
            <FlatList
            style={{width:'100%'}}
                data={listPokemon}
                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                keyExtractor={(item) => item.id}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.4}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={(
                    <ActivityIndicator
                        style={{ height: 100 }}
                        color="red"
                        size={30}
                    />
                )}
                numColumns={1}
                ListHeaderComponent={(
                    <Text style={{
                        fontSize: 36,
                        fontWeight: "bold",
                        top: top + 15,
                        marginBottom: top+35,
                        paddingLeft: 15,
                        // textAlign:'center'
                        color: colors.text
                    }}>Pokedex</Text>
                )}
            />
            </View>
        </>
    )
}

