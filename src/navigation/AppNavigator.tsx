import { createNativeStackNavigator } from '@react-navigation/native-stack'

// navigation
import { Routes } from './'

// pages
import { OnboardingPage, AuthPage } from '../features'

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={Routes.auth} component={AuthPage} />
            <Stack.Screen name={Routes.onboarding} component={OnboardingPage} />
        </Stack.Navigator>
    )
}

export default RootStack