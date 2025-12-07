import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from 'lucide-react-native'

// shared
import { Constants, Theme } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

const HeaderBackButton = () => {
    const isDarkMode: boolean = useTheme()
    const navigation = useNavigation()

    return (
        <Pressable
            style={styles().container}
            onPress={() => navigation.goBack()}>
            <ChevronLeft
                size={20}
                color={isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text} />
        </Pressable>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default HeaderBackButton