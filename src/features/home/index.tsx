import React from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// components
import { AppContainer, AppSpacer, AppText } from '../../components'

// shared
import { Theme, Colors, Constants } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

// widgets
import { AssessmentCard, WelcomeHeader } from './widgets'

const HomePage = () => {
    return (
        <AppContainer>
            <WelcomeHeader />

            <AppSpacer size={Constants.SPACE_LARGE} />

            <AssessmentCard />
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({

})

export default HomePage