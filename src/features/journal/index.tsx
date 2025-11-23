import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { AppContainer, AppLoader, AppText } from '../../components'

// shared
import { Theme, Colors } from '../../shared'
import { getUserDetails, clearAllData } from '../../shared/services/persistentStorage'

// hooks
import { useTheme } from '../../hooks'


const JournalPage = () => {

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const result = await getUserDetails()
        console.log(result)
    }

    return (
        <AppContainer isLoading={false}>
            <AppText text='Journal page' />
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({

})

export default JournalPage