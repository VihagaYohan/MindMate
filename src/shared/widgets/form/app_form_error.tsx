import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import { AppText } from '../../../components'

// shared
import { Constants, DeviceUtils, Colors, Theme } from '../../'

// hooks
import { useTheme } from '../../../hooks'

interface propTypes {
    errorMessage: string | any;
    visible: boolean | any
}

const AppFormError = ({ errorMessage, visible }: propTypes) => {
    const isDarkMode: boolean = useTheme()


    if (!visible || !errorMessage) return null;

    return (
        <View>
            <AppText
                text={errorMessage}
                textStyle={styles(isDarkMode).errorMessage}
                fontSize={12} />
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    errorMessage: {
        color: isDarkMode ? Theme.lightTheme.colors.error : Theme.darkTheme.colors.error
    }
})

export default AppFormError