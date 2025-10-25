import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// share
import { Constants } from '../../shared'

// views
import { LoginPage } from './views'

const AuthPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <LoginPage />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.SPACE_MEDIUM
    }
})

export default AuthPage