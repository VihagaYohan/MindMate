import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { Camera } from 'lucide-react-native'

// components
import { AppButton, AppContainer, AppText } from '../../components'

// svg
import Happy from '../../assets/images/happy.svg'

const OnboardingPage = () => {
    return (
        <AppContainer>

            <AppButton label='Next' onPress={() => { console.log('hello') }} isPrimary />
            <Camera fill="red" />;
        </AppContainer>
    )
}

const styles = StyleSheet.create({

})

export default OnboardingPage