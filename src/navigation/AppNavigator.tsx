import { createNativeStackNavigator } from '@react-navigation/native-stack'

// navigation
import { Routes, BottomNavigator } from './'

// pages
import { OnboardingPage, AuthPage, HomePage } from '../features'

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={Routes.auth} component={AuthPage} />
            <Stack.Screen name={Routes.onboarding} component={OnboardingPage} />
            <Stack.Screen name={Routes.bottomNav} component={BottomNavigator} />
        </Stack.Navigator>
    )
}

export default RootStack