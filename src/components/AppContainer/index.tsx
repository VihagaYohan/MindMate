import React from 'react';
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// shared
import { DeviceUtils, Constants } from '../../shared/'

interface AppContainerProps {
  children: React.ReactNode
}

const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: DeviceUtils.SCREEN_WIDTH,
    height: DeviceUtils.SCREEN_HEIGHT,
    padding: Constants.SPACE_SMALL,
  }
})

export default AppContainer