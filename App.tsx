/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <AppNavigator />
  );
}



export default App;
