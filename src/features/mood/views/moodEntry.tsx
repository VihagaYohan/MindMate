import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'
import { ChevronLeft } from 'lucide-react-native'
import Slider from '@react-native-community/slider';

// components
import { AppContainer, AppText, AppTextField, AppButton } from '../../../components'

// constants
import { Constants, Colors, Theme, DeviceUtils } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { AppHeader } from '../../../shared'

const MoodEntry = () => {
    const isDarkMode: boolean = useTheme()
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerLeft: () => {
                return <ChevronLeft size={30} color={isDarkMode ? Theme.darkTheme.colors.onSurface : Theme.lightTheme.colors.onSurface} />
            }
        })
    })

    return (
        <AppContainer>
            <AppText text='How are you feeling today ?' textStyle={styles(isDarkMode).title} fontSize={18} />

            {/* canvas drawing area */}
            <View style={styles(isDarkMode).canvasContainer}>

            </View>

            {/* bottom section */}
            <View>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                />
                <AppButton label='Submit' onPress={() => console.log('mood submitted')} isPrimary />
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
        borderWidth: 1
    }
})

export default MoodEntry