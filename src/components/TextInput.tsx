import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
import { useDebounce } from '../hooks/useDebounce';

interface Props{
    onDebounce: (value:string)=> void
}

export const TextInputSearch = ({ onDebounce }:Props) => {
    const { theme: { colors } } = useContext(ThemeContext);

    const [textValue, setTextValue] = useState("");

    const { debounceValue }  = useDebounce(textValue, 500);

    useEffect(() => {
        
        onDebounce(debounceValue)

    }, [debounceValue])
    

    return (
        <View >
            <TextInput
                placeholder="Search a pokemon by name or id"
                placeholderTextColor={colors.background === 'black' ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.5)'}
                style={{
                    ...style.input,
                    backgroundColor: colors.background === 'black' ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)',
                    color: colors.background === 'black' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'
                }}
                autoCapitalize={"none"}
                autoCorrect={false}
                value={textValue}
                onChangeText={ setTextValue }
            />

            <Icon
                name="search"
                size={30}
                color={colors.background === 'black' ? 'rgba(0,0,0,.7)' : 'rgba(255,255,255,.7)'}
                style={{...style.icon}}
            />


        </View>
    )
}
const style = StyleSheet.create({
    input: {
        marginHorizontal: 20,
        borderRadius: 5,
        paddingLeft: 15,
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 16,
        paddingVertical: 13
    },
    icon: {
        position: 'absolute',
        bottom: '24%',
        right: '10%'
    }
})