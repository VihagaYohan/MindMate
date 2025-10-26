import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

// share
import { Constants } from '../../shared'

// views
import { LoginPage, RegisterPage } from './views'

const AuthPage = () => {
    const [login, setLogin] = useState<boolean>(false)

    const toggleForm = () => {
        setLogin((prev) => !prev)
    }

    return (
        <SafeAreaView style={styles.container}>
            {login ? (<LoginPage onPress={() => toggleForm()} />) : (<RegisterPage onPress={() => toggleForm()} />)}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: Constants.SPACE_MEDIUM
    }
})

export default AuthPage