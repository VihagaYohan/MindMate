import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ChevronDown } from 'lucide-react-native'

// components
import { AppText } from '../../../components'

// shared
import { Theme, Colors, Constants } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

const PeriodPicker = () => {
    const isDarkMode = useTheme()

    return (
        <View style={styles(isDarkMode).container}>
            <AppText text='Weekly' fontSize={11} textStyle={styles(isDarkMode).title} />
            <ChevronDown />
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: Colors.primaryCore,
        paddingVertical: Constants.SPACE_SMALL,
        paddingHorizontal: Constants.SPACE_MEDIUM,
        borderRadius: Constants.SPACE_LARGE
    },
    title: {
        fontFamily: 'poppins_medium'
    }
})

export default PeriodPicker