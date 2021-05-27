import { Theme } from "@react-navigation/native";

type ThemeAction = {type: 'darkTheme'} | {type: 'lightTheme'}

export interface ThemeState extends Theme{
    currentTheme: 'ligth' | 'dark';
    dark: boolean;
    deviderColor: string;
}

export const lightTheme:ThemeState ={
    currentTheme: 'ligth',
    dark: false,
    deviderColor: 'red',
    colors: {
        primary: 'red',
        background: 'white',
        card: 'orange',
        text: 'black',
        border: 'white',
        notification: 'purple',
    }
}

export const darkTheme:ThemeState ={
    currentTheme: 'ligth',
    dark: true,
    deviderColor: 'red',
    colors: {
        primary: 'red',
        background: 'black',
        card: 'orange',
        text: 'white',
        border: 'white',
        notification: 'purple',
    }
}

export const themeReducer = (state: ThemeState , action: ThemeAction):ThemeState  =>{

    switch (action.type) {
        case 'darkTheme':
            return {
                ...darkTheme
            };

        case 'lightTheme':
            return {
                ...lightTheme
            };
    
        default:
            return state;
    }
}