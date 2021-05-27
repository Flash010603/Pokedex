import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { StatusBar } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { PokemonDetailsScreen } from '../screens/PokemonDetailsScreen';
import { SimplePokemon } from '../interfaces/PokemonInterfaces';

export type RootStackParams = {
    HomeScreen:undefined,
    PokemonDetailsScreen: { simplePokemon:SimplePokemon, color:string }
}

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigation = () => {
    
    const {theme} = useContext(ThemeContext)

    return (
       <>
       
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                cardStyle:{
                    backgroundColor:theme.colors.background
                }
            }}
            
        >
            <Stack.Screen name="HomeScreen"  component={HomeScreen} />
            <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetailsScreen} />
        </Stack.Navigator>
       
       </>
    )
}

