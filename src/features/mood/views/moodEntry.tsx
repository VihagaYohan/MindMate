import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import Animated, { useSharedValue, useAnimatedProps, withTiming, useAnimatedStyle, interpolate, interpolateColor } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChevronLeft } from 'lucide-react-native'
import Slider from '@react-native-community/slider';
import { Canvas, Circle, Path, Group } from '@shopify/react-native-skia'

// components
import { AppContainer, AppText, AppTextField, AppButton } from '../../../components'

// constants
import { Constants, Colors, Theme, DeviceUtils } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { AppHeader } from '../../../shared'

// navigation
import { RootStackParamList } from '../../../navigation/RootStackParamList'
import { Routes } from '../../../navigation'

type PropTypes = NativeStackScreenProps<RootStackParamList, Routes>

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const MoodEntry = ({ navigation }: PropTypes) => {
    const isDarkMode: boolean = useTheme()
    const [sliderState, setSliderState] = useState<number>(1.5)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    // Shared value for animation (0 = sad, 1.5 = neutral, 3 = happy)
    const moodValue = useSharedValue(1.5)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerLeft: () => {
                return <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ChevronLeft size={30} color={isDarkMode ? Theme.darkTheme.colors.onSurface : Theme.lightTheme.colors.onSurface} />
                </TouchableOpacity>
            },
        })
    })

    const circleRadius = Math.min(canvasSize.width, canvasSize.height) / 3

    const backgroundStyle = useAnimatedStyle(() => {

        const backgroundColors = interpolateColor(
            moodValue.value,
            [0, 2, 3],
            ['#7f8c8d', '#f5f5dc', '#2ecc71'])

        return ({
            backgroundColor: backgroundColors
        })
    })

    // Helper function to get mood type
    const getMoodType = (value: number) => {
        if (value < 1) return 'sad'
        if (value < 2) return 'neutral'
        return 'happy'
    }

    const moodType = getMoodType(sliderState)

    const handleSliderChange = (value: number) => {
        setSliderState(value)
        moodValue.value = withTiming(value, { duration: 300 })
    }

    const getMoodLabel = () => {
        if (moodType === 'happy') return '😊 Happy'
        if (moodType === 'neutral') return '😐 Neutral'
        return '😢 Sad'
    }

    return (
        <AppContainer>
            <AppText text='How are you feeling today ?' textStyle={styles(isDarkMode).title} fontSize={18} />

            {/* canvas drawing area */}
            <Animated.View
                style={[styles(isDarkMode).canvasContainer, backgroundStyle]}
                onLayout={(e) => {
                    const { width, height } = e.nativeEvent.layout
                    setCanvasSize({ width, height })
                }}
            >
                <Canvas style={{
                    flex: 1,
                }}>
                    {/* {canvasSize.width > 0 && drawFace()} */}
                </Canvas>
            </Animated.View>

            {/* bottom section */}
            <View>
                <Text style={styles(isDarkMode).moodLabel}>{getMoodLabel()}</Text>

                <Slider
                    style={{
                        width: DeviceUtils.SCREEN_WIDTH - (Constants.SPACE_MEDIUM * 2),
                        height: 40,
                        alignSelf: 'center'
                    }}
                    value={sliderState}
                    onValueChange={handleSliderChange}
                    minimumValue={0}
                    maximumValue={3}
                    minimumTrackTintColor="#06B6D4"
                    maximumTrackTintColor="#CBD5E1"
                />

                <View style={styles(isDarkMode).moodLabels}>
                    <Text style={styles(isDarkMode).moodLabelText}>Sad</Text>
                    <Text style={styles(isDarkMode).moodLabelText}>Neutral</Text>
                    <Text style={styles(isDarkMode).moodLabelText}>Happy</Text>
                </View>

                <AppTextField label="" placeholder='Type here something' />

                <AppButton label='Submit' onPress={() => console.log('mood submitted:', moodType)} isPrimary />
            </View>

        </AppContainer>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    title: {
        alignSelf: 'center',
        fontFamily: 'poppins_semibold',
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
    },
    canvasContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: isDarkMode ? '#444' : '#e0e0e0',
        borderRadius: 12,
        marginVertical: 20,
    },
    moodLabel: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'poppins_semibold',
        marginBottom: 10,
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
    },
    moodLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Constants.SPACE_MEDIUM,
        marginTop: 5,
        marginBottom: 15
    },
    moodLabelText: {
        color: 'black',//isDarkMode ? Theme.darkTheme.colors.textSecondary : Theme.lightTheme.colors.textSecondary,
        fontSize: 12
    }
})

export default MoodEntry