/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useEffect, useState } from 'react'
import { StatusBar, useColorScheme, } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';

// navigator
import { AppNavigator } from './src/navigation'

// shared
import { Theme } from './src/shared/'
import { getUserDetails } from './src/shared/services/persistentStorage'

// models
import { PersistentStorage } from './src/data/models'
import { AppLoader } from './src/components';


// create a client
const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer theme={isDarkMode ? Theme.darkTheme : Theme.lightTheme}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

function AppContent() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const checkUserLoggedIn = async () => {
    const result: PersistentStorage = await getUserDetails()
    console.log(result)
    if (result && result.token.length > 0) {
      console.log(`1 ${result.token}`)
      setUserLoggedIn(true)
    } else {
      console.log(`2`)
      setUserLoggedIn(false)
    }
    setLoading(false)
  }

  if (loading) {
    return <AppLoader />
  }

  return (<AppNavigator userLoggedIn={userLoggedIn} />)
}



export default App;
