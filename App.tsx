
import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './src/navigation/TabNavigation';
import { ThemeProvider } from './src/context/ThemeContext';


const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App
