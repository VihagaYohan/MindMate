import React, { useLayoutEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, LayoutChangeEvent } from 'react-native'
import Animated, { useSharedValue, useAnimatedProps, withTiming, useAnimatedStyle, interpolate, interpolateColor } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChevronLeft } from 'lucide-react-native'
import Slider, { MarkerProps } from '@react-native-community/slider';
import { Canvas, Circle, Path, Group, Skia } from '@shopify/react-native-skia'

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

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>

const eyeRadius: number = 15
const AnimatedContainer = Animated.createAnimatedComponent(AppContainer)

const MoodEntry = ({ navigation }: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const [sliderState, setSliderState] = useState<number>(1.5)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    // shared value for animation (0 = sad, 1.5 = neutral, 3 = happy)
    const moodValue = useSharedValue(3)

    const backgroundStyle = useAnimatedStyle(() => {
        const backgroundColors = interpolateColor(
            moodValue.value,
            [0, 2, 3],
            ['#7f8c8d', '#f5f5dc', '#2ecc71'])

        return ({
            backgroundColor: backgroundColors
        })
    })

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout
        setCanvasSize({
            width,
            height
        })
    }, [])

    // calculate properties for face
    const faceProps = useMemo(() => {
        return {
            cx: canvasSize.width / 2,
            cy: canvasSize.height / 2,
            r: canvasSize.width / 2.5

        }
    }, [canvasSize])


    // draw mouth path
    const mouthPath = useMemo(() => {
        const path = Skia.Path.Make();

        const cx = canvasSize.width / 2;
        const cy = canvasSize.height / 1.55;   // baseline mouth y
        const spread = canvasSize.width / 5;    // how wide the mouth is

        const leftX = cx - spread;
        const rightX = cx + spread;

        // Mood arc height (0 = sad, 1.5 = neutral, 3 = happy)
        const controlY = cy + (moodValue.value - 1.5) * -20;

        path.moveTo(leftX, cy);
        path.quadTo(cx, controlY, rightX, cy);

        return path;
    }, [canvasSize, moodValue.value]);

    const handleSliderChange = (value: number) => {
        setSliderState(value)
        moodValue.value = withTiming(value, { duration: 500 })
    }

    return (
        <AppContainer>

            <AppText
                text='How are you feeling today ?'
                textStyle={styles(isDarkMode).title}
                fontSize={14} />

            <View
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: Constants.SPACE_MEDIUM,
                    borderColor: Colors.neutral80
                }}
                onLayout={onLayout}>

                <Canvas style={{
                    width: canvasSize.width,
                    height: canvasSize.height
                }}>

                    <Group>
                        <Circle
                            cx={faceProps.cx}
                            cy={faceProps.cy}
                            r={faceProps.r}
                            color="yellow" />

                        <Circle
                            cx={canvasSize.width / 3}
                            cy={canvasSize.height / 2.3}
                            r={eyeRadius}
                            color="black" />

                        <Circle
                            cx={canvasSize.width / 1.5}
                            cy={canvasSize.height / 2.3}
                            r={eyeRadius}
                            color="black" />

                        <Path
                            path={mouthPath}
                            color="black"
                            style="stroke"
                            strokeWidth={4}
                            strokeJoin="round"
                            strokeCap="round" />

                    </Group>
                </Canvas>

            </View>

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
                minimumTrackTintColor={Colors.primaryCore}
                maximumTrackTintColor={Colors.neutral80}
                thumbTintColor={Colors.primaryCore}
            />

            <AppTextField
                label=''
                placeholder='Type what you feel here' />

            <AppButton
                isPrimary
                label='Submit'
                onPress={() => console.log("submit clicked")} />

        </AppContainer>
    )

}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    title: {
        fontFamily: 'poppins_semibold',
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text,
        alignSelf: 'center'
    }
})

export default MoodEntry