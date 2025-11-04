import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// components
import { AppText } from '../components';

// navigation
import { Routes } from './';

// page
import { HomePage, JournalPage, MoodPage, SettingsPage } from '../features';

// icon
import { House, Laugh, NotebookPen, UserRound } from 'lucide-react-native';

// shared
import { Colors, Constants } from '../shared/';
import { RootStackParamList } from './RootStackParamList.ts';

const Tab = createBottomTabNavigator<RootStackParamList>();

const RootBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.home}
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: Colors.primaryCore,
        tabBarInactiveTintColor: Colors.neutral70,
      }}
    >
      <Tab.Screen
        name={Routes.home}
        component={HomePage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <House color={focused ? Colors.primaryCore : color} size={size} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <AppText
                text="Home"
                textStyle={{ ...styles.labelStyle, color: color }}
              />
            ) : null,
          tabBarLabelPosition: 'beside-icon',
        }}
      />

      <Tab.Screen
        name={Routes.mood}
        component={MoodPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Laugh color={focused ? Colors.primaryCore : color} size={size} />
            </View>
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <AppText
                text="Mood"
                textStyle={{ ...styles.labelStyle, color: color }}
              />
            ) : null,
          tabBarLabelPosition: 'beside-icon',
        }}
      />

      <Tab.Screen
        name={Routes.journal}
        component={JournalPage}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NotebookPen
                color={focused ? Colors.primaryCore : color}
                size={size}
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <AppText
                text="Resources"
                textStyle={{ ...styles.labelStyle, color: color }}
              />
            ) : null,
          tabBarLabelPosition: 'beside-icon',
        }}
      />

      <Tab.Screen
        name={Routes.settings}
        component={SettingsPage}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <UserRound
                color={focused ? Colors.primaryCore : color}
                size={size}
              />
            </View>
          ),
          tabBarLabel: ({ focused, color }) =>
            focused ? (
              <AppText
                text="Profile"
                textStyle={{ ...styles.labelStyle, color: color }}
              />
            ) : null,
          tabBarLabelPosition: 'beside-icon',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: Colors.primaryCore,
    marginHorizontal: Constants.SPACE_SMALL,
  },
});

export default RootBottomTab;
