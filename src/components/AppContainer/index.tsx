import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// component
import { AppLoader } from '../'

// shared
import { Constants } from '../../shared/'

// hooks
import { useTheme } from '../../hooks'

interface AppContainerProps {
  children: React.ReactNode,
  containerStyle?: ViewStyle,
  isLoading?: boolean
}

const AppContainer: React.FC<AppContainerProps> = ({ children, containerStyle, isLoading = false }: AppContainerProps) => {
  const isDarkMode: boolean = useTheme()

  if (isLoading) {
    return <AppLoader />
  }

  return (
    <SafeAreaView style={{ ...styles.container, ...containerStyle }}>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        showHideTransition='fade'
        hidden={false}
      />
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.SPACE_MEDIUM,
  },
  statusBarStyle: {

  }
})

export default AppContainer