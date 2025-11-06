import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// shared
import { Constants } from '../../shared/'

// hooks
import { useTheme } from '../../hooks'

interface AppContainerProps {
  children: React.ReactNode,
  containerStyle?: ViewStyle
}

const AppContainer: React.FC<AppContainerProps> = ({ children, containerStyle }: AppContainerProps) => {
  const isDarkMode: boolean = useTheme()

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
    padding: Constants.SPACE_SMALL,
  },
  statusBarStyle: {

  }
})

export default AppContainer