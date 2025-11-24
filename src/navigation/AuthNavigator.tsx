import { createNativeStackNavigator } from '@react-navigation/native-stack'

// navigation
import { Routes, AppNavigator } from './'
import { RootStackParamList } from './RootStackParamList'

// pages
import { AuthPage, OnboardingPage } from '../features'

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                name={Routes.onboarding}
                component={OnboardingPage} />

            <Stack.Screen
                name={Routes.login} component={AuthPage} />

            <Stack.Screen
                name={Routes.appNav} component={AppNavigator} />
        </Stack.Navigator>
    )
}

export default AuthNavigator