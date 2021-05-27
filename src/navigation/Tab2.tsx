import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { PokemonDetailsScreen } from "../screens/PokemonDetailsScreen";
import { SearchPokemonScreen } from "../screens/SearchPokemonScreen";
import { RootStackParams } from "./Tab1";

const Stack = createStackNavigator<RootStackParams>();


export const StackParams = () => {
    
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
            <Stack.Screen name="HomeScreen"  component={SearchPokemonScreen} />
            <Stack.Screen name="PokemonDetailsScreen" component={PokemonDetailsScreen} />
        </Stack.Navigator>
       
       </>
    )
}