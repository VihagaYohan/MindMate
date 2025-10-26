import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

// shared
import { Theme, Colors, Constants, DeviceUtils } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

const SIZE = 50

const AppLoader = () => {
    const isDarkMode = useTheme()

    return (
        <View style={styles(isDarkMode).container}>
            <ActivityIndicator size={SIZE} color={Colors.primaryCore} />
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        width: DeviceUtils.SCREEN_WIDTH,
        height: DeviceUtils.SCREEN_HEIGHT,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: isDarkMode ? Theme.darkTheme.colors.background : Theme.lightTheme.colors.background
    }
})

export default AppLoader