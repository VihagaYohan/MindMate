import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { AppContainer, AppText } from '../../components'

// shared
import { Theme, Colors } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

const JournalPage = () => {
    return (
        <SafeAreaView>
            <AppText text='Home page' />
        </SafeAreaView>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({

})

export default JournalPage