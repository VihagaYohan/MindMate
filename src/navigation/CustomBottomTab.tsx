import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Easing } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

// icon
import { House, Laugh, NotebookPen, UserRound } from 'lucide-react-native';

// components
import { AppText } from '../components'

// shared
import { Constants, Theme, DeviceUtils, Colors } from '../shared'

// hooks
import { useTheme as DeviceTheme } from '../hooks'


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const LeftPadding: number = DeviceUtils.SCREEN_WIDTH * 0.12
const IconSize: number = 25

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const isDarkMode: boolean = DeviceTheme()
    const insets = useSafeAreaInsets();


    const renderIcon = (route: string, color: string) => {
        switch (route) {
            case 'Mood':
                return <Laugh size={IconSize} color={color} />
            case 'Journal':
                return <NotebookPen size={IconSize} color={color} />
            case 'Settings':
                return <UserRound size={IconSize} color={color} />
            default:
                return <House size={IconSize} color={color} />
        }
    }

    return (
        <View style={{
            ...styles(isDarkMode).container,
            left: LeftPadding,
            bottom: insets.bottom + Constants.SPACE_SMALL,
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <AnimatedTouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={{
                            ...styles(isDarkMode).buttonContainer,
                            borderRadius: isFocused ? Constants.SPACE_LARGE : 0,
                            backgroundColor: isFocused ? Colors.primary25 : 'transparent',
                            marginRight: index == (state.routes.length - 1) ? Constants.SPACE_SMALL : 0
                        }}
                        layout={LinearTransition
                            .mass(5)
                            .stiffness(150)
                            .springify()}
                    >
                        {renderIcon(route.name, !isFocused ? Colors.neutral60 : Colors.neutral100)}

                        {isFocused && (
                            <AppText text={route.name} textStyle={{
                                ...styles(isDarkMode).labelStyle,
                                color: !isFocused ? Colors.neutral60 : Colors.neutral100
                            }} fontSize={11} />
                        )}
                    </AnimatedTouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        borderRadius: Constants.SPACE_LARGE * 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%',
        alignSelf: 'center',
        paddingVertical: Constants.SPACE_MEDIUM / 2,
        paddingHorizontal: Constants.SPACE_SMALL,
        position: 'absolute',
        backgroundColor: isDarkMode ? Theme.darkTheme.colors.surfaceVariant : 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Constants.SPACE_MEDIUM,
        paddingVertical: Constants.SPACE_SMALL
    },
    labelStyle: {
        fontFamily: 'poppins_medium',
        marginLeft: Constants.SPACE_SMALL
    }
})

export default CustomTabBar