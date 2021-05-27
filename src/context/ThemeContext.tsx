import React, { createContext, useEffect, useReducer } from 'react'
import { Appearance, AppState, useColorScheme } from 'react-native';
import { themeReducer, ThemeState,lightTheme, darkTheme } from './themeReducer';


interface ThemeContextProps {
    theme: ThemeState
    setDarkTheme: () => any;
    setLightTheme: () => any;
}


export const ThemeContext = createContext({} as ThemeContextProps);


export const ThemeProvider = ({ children }: any) => {

    const [theme, dispatch] = useReducer(themeReducer,  (Appearance.getColorScheme() == 'light') ? lightTheme : darkTheme);

    useEffect(() => {

        AppState.addEventListener('change', (status)=>{
            if(status==='active') {
                (Appearance.getColorScheme() == 'light') ? setLightTheme()  : setDarkTheme() 
            }
        })
            
    }, [])

    const setDarkTheme = () => {
        dispatch({
            type:'darkTheme'
        })
    }
    const setLightTheme = () => {
        dispatch({
            type:'lightTheme'
        })
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setDarkTheme,
                setLightTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}
