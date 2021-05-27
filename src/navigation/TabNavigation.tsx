import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigation } from './Tab1';
import { ThemeContext } from '../context/ThemeContext';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { StackParams } from './Tab2';


const Tab = createBottomTabNavigator();

export const TabNavigation = () => {

    const { theme: { colors } } = useContext(ThemeContext);

    return (
        <>
            <StatusBar backgroundColor="transparent" barStyle={colors.background === 'black' ? 'light-content' : 'dark-content'} translucent />

            <Tab.Navigator
                sceneContainerStyle={{
                    backgroundColor: colors.background
                }}
                tabBarOptions={{
                    activeBackgroundColor: colors.background === 'black' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,.8)',
                    labelStyle:{
                        marginBottom: 10
                    },
                    style:{
                        position:'absolute',
                        backgroundColor: colors.background === 'black' ? 'rgba(0,0,0,.9)' : 'rgba(255,255,255,.8)',
                        elevation: 0,
                        borderWidth:0,
                        borderColor:'black',
                        height: 55,
                    },
                    showLabel:false
                }}
                
            >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused, size }) => <Icon name="list-outline" color={color} size={size+5} />,
                    }}
                    name="Home" component={StackNavigation} />
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ color, focused, size }) => <Icon name="search-outline" color={color} size={size+5} />,
                    }}
                    name="SearchPokemonScreen" component={StackParams}
                />
            </Tab.Navigator>
        </>
    );
}