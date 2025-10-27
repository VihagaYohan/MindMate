import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from 'lucide-react-native'

// components
import { AppText } from '../../components'

// shared
import { Theme, Colors } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

interface propTypes {
    title: string,
    isLeftIcon?: boolean
}

const AppHeader = ({ title, isLeftIcon }: propTypes) => {
    const isDarkMode = useTheme()
    const navigation = useNavigation()

    return (
        <View style={styles(isDarkMode).container}>

        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flexDirection: "row"
    }
})

export default AppHeader