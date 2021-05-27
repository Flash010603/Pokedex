import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PokemonCard } from '../components/PokemonCard';
import { TextInputSearch } from '../components/TextInput';
import { ThemeContext } from '../context/ThemeContext';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

export const SearchPokemonScreen = () => {

    const { top } = useSafeAreaInsets();
    const { theme: { colors } } = useContext(ThemeContext);

    const { isFetching, searchListPokemon } = usePokemonSearch();

    const [search, setSearch] = useState("")

    const [filterPokemon, setFilterPokemon] = useState<SimplePokemon[]>([])

    console.log(filterPokemon)

    useEffect(() => {

        if (search.length === 0) return setFilterPokemon([]);

        
        if (isNaN(Number(search))) {
            const pokemonByName = searchListPokemon.find( (poke)=> poke.name.toLowerCase().includes(search.trim().toLowerCase()));
            setFilterPokemon(
                (pokemonByName)? [pokemonByName] : []
            )
        } else {
            const pokemonById = searchListPokemon.find(poke => poke.id === (search.trim()));

            setFilterPokemon(
                (pokemonById) ? [pokemonById] : []
            )
        }



    }, [search])

    return (
        <View style={{ top: top + 20 }}>

            <TextInputSearch
                onDebounce={(value) => setSearch(value)}
            />

            {
                (isFetching)
                    ? <View style={{ height: '85%', justifyContent: 'center' }}>
                        <ActivityIndicator
                            style={{ marginBottom: 10 }}
                            color="red"
                            size={70}
                        />
                        <Text style={{ color: colors.text, textAlign: 'center' }}>Loaging results</Text>
                    </View>
                    :
                    (filterPokemon.length === 0)
                        ? <View>
                            <Text style={{
                                color: colors.text, fontSize: 36,
                                fontWeight: "bold",
                                top: top - 15,
                                marginBottom: top + 35,
                                paddingLeft: 15,
                            }}>{search}</Text>
                            <Text style={{ color: colors.text, textAlign: 'center', letterSpacing: 1, fontSize: 20 }}>There is not results</Text>
                        </View>
                        :
                        <View>

                            <FlatList
                                style={{ width: '100%' }}
                                data={filterPokemon}
                                renderItem={({ item }) => <PokemonCard pokemon={item} />}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                numColumns={1}
                                ListHeaderComponent={(
                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: "bold",
                                        top: top - 15,
                                        marginBottom: top + 35,
                                        paddingLeft: 15,
                                        // textAlign:'center'
                                        color: colors.text
                                    }}>
                                        {search}
                                    </Text>
                                )}
                            />
                        </View>

            }



        </View>
    )
}

