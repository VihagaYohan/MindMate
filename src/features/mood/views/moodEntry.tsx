import React, { useLayoutEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, LayoutChangeEvent, Platform } from 'react-native'
import Animated, { useSharedValue, useAnimatedProps, withTiming, useAnimatedStyle, interpolateColor } from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ChevronLeft } from 'lucide-react-native'
import Slider from '@react-native-community/slider';
import { Canvas, Circle, Path, Group, Skia } from '@shopify/react-native-skia'
import * as Yup from 'yup'

// components
import { AppContainer, AppText, AppTextField, AppButton, AppSpacer } from '../../../components'

// constants
import { Constants, Colors, Theme, DeviceUtils } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { AppHeader, AppForm, AppFormField, AppFormButton } from '../../../shared'

// navigation
import { RootStackParamList } from '../../../navigation/RootStackParamList'
import { Routes } from '../../../navigation'

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>

const eyeRadius: number = 15


// validation
const validation = Yup.object().shape({
    moodInput: Yup.string().min(10).required("Mood input is required")
})

const MoodEntry = ({ navigation }: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const [sliderState, setSliderState] = useState<number>(1.5)
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "",
            headerLeft: () => {
                return (
                    <TouchableOpacity style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => navigation.goBack()}>
                        <ChevronLeft size={20} color={isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text} />
                    </TouchableOpacity>
                )
            }
        })
    }, [])

    // shared value for animation (0 = sad, 1.5 = neutral, 3 = happy)
    const moodValue = useSharedValue(3)

    const backgroundStyle = useAnimatedStyle(() => {
        const backgroundColors = interpolateColor(
            moodValue.value,
            [0, 2, 3],
            ['#ce5a3dff', '#a3a39a', '#18e06c'])

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

            <Animated.View
                style={[{
                    flex: 1,
                    borderWidth: 1,
                    borderRadius: Constants.SPACE_MEDIUM,
                    borderColor: Colors.neutral80,
                }, backgroundStyle]}
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
                            color="yellow"
                        />

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

            </Animated.View>

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

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <AppForm
                    initialValues={{
                        moodInput: ""
                    }}
                    validationSchema={validation}
                    onSubmit={value => console.log(value)}>

                    <AppFormField
                        name='moodInput'
                        label=''
                        placeholder='Type what you feel'
                    />

                    <AppSpacer
                        size={Constants.SPACE_MEDIUM} />

                    <AppFormButton
                        label='Submit'
                        isPrimary />

                </AppForm>

            </KeyboardAvoidingView>



        </AppContainer>
    )

}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontFamily: 'poppins_semibold',
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text,
        alignSelf: 'center'
    }
})

export default MoodEntry