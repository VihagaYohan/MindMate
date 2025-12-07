import { createNativeStackNavigator } from '@react-navigation/native-stack'

// navigation
import { Routes, BottomNavigator } from './'
import { RootStackParamList } from './RootStackParamList.ts';

// pages
import { OnboardingPage, AuthPage, MoodEntryPage, ResourcesPage } from '../features'


const Stack = createNativeStackNavigator<RootStackParamList>();

interface propTypes {
    userLoggedIn?: boolean
}

const RootStack = ({ userLoggedIn = false }: propTypes) => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.login}
            screenOptions={{
                headerShown: false,
                headerTransparent: true
            }}>
            <Stack.Screen name={Routes.onboarding} component={OnboardingPage} />
            <Stack.Screen name={Routes.login} component={AuthPage} />
            <Stack.Screen name={Routes.bottomNav} component={BottomNavigator} />
            <Stack.Screen name={Routes.moodEntry} component={MoodEntryPage} />
            <Stack.Screen
                name={Routes.resources}
                component={ResourcesPage} />
        </Stack.Navigator>
    )
}

export default RootStack