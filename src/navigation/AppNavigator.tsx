import { createNativeStackNavigator } from '@react-navigation/native-stack'

// navigation
import { Routes, BottomNavigator } from './'
import { RootStackParamList } from './RootStackParamList.ts';

// pages
import { OnboardingPage, AuthPage } from '../features'


const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.bottomNav}
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name={Routes.onboarding} component={OnboardingPage} />
            <Stack.Screen name={Routes.login} component={AuthPage} />
            <Stack.Screen name={Routes.bottomNav} component={BottomNavigator} />
        </Stack.Navigator>
    )
}

export default RootStack