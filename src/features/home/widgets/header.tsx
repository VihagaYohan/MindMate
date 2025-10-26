import React from 'react'
import { StyleSheet, View } from 'react-native'

// components
import { AppText } from '../../../components'

// shared
import { Theme, Colors } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'
import { Subtitles } from 'lucide-react-native'

const WelcomeHeader = () => {
    const isDarkTheme = useTheme()

    return (
        <View style={styles(isDarkTheme).container}>
            <View>
                <AppText text='Hi, Yohan' textStyle={styles(isDarkTheme).name} fontSize={20} />
                <AppText text='How are you feeling today..' textStyle={styles(isDarkTheme).subTitle} fontSize={11} />
            </View>
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    name: {
        fontFamily: "poppins_bold",
        color: Colors.primaryCore
    },
    subTitle: {
        fontFamily: "poppins_medium",
        color: Colors.neutral70
    }
})

export default WelcomeHeader