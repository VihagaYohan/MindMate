import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

// shared
import {  Constants } from '../../shared/'

interface AppContainerProps {
  children: React.ReactNode,
  containerStyle?: ViewStyle
}

const AppContainer: React.FC<AppContainerProps> = ({ children, containerStyle }: AppContainerProps) => {
  return (
    <SafeAreaView style={{...styles.container, ...containerStyle}}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Constants.SPACE_SMALL,
  }
})

export default AppContainer