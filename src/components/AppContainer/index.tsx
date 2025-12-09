import React from 'react';
import { StyleSheet, ViewStyle, StatusBar, StatusBarStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// component
import { AppLoader, AppText } from '../'

// shared
import { Constants } from '../../shared/'

// hooks
import { useTheme } from '../../hooks'

interface AppContainerProps {
  children: React.ReactNode,
  containerStyle?: ViewStyle,
  isLoading?: boolean,
  isError?: boolean,
  errorMessage?: string
}

const AppContainer: React.FC<AppContainerProps> = ({
  children,
  containerStyle,
  isLoading = false,
  isError = false,
  errorMessage = "Something went wrong. Please try again" }: AppContainerProps) => {
  const isDarkMode: boolean = useTheme()

  if (isLoading) {
    return <AppLoader />
  }

  if (isError) {
    return (
      <SafeAreaView style={{ ...styles.container, ...containerStyle }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          showHideTransition='fade'
          hidden={false}
        />
        <AppText
          text={errorMessage}
          fontSize={15}
          textStyle={styles.errorMessage} />
      </SafeAreaView>
    )
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
  errorMessage: {
    fontFamily: 'poppins_medium'
  }
})

export default AppContainer