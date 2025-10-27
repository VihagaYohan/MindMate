import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CurveType, LineChart } from 'react-native-gifted-charts'

// components
import { AppContainer, AppText, AppButton, AppSpacer } from '../../components'

// shared
import { Theme, Colors, Constants } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

// widgets
import { PeriodPicker } from './widgets'

const MoodPage = () => {
    const isDarkMode = useTheme()
    const navigation = useNavigation()

    const data = [{ value: 15, label: 'Mon' },
    { value: 30, label: 'Tue' },
    { value: 10, label: 'Wed' },
    { value: 40, label: 'Thu' },
    { value: 16, label: 'Fri' },
    { value: 40, label: 'Sat' },];

    return (
        <AppContainer>

            <View style={styles(isDarkMode).titleSection}>
                <AppText
                    text='Mood Log'
                    textStyle={styles(isDarkMode).logTitle}
                    fontSize={14} />

                <PeriodPicker />
            </View>

            <AppSpacer size={Constants.SPACE_MEDIUM} />



            <LineChart
                data={data}
                color1={Colors.primaryCore}
                thickness={3}
                dataPointsColor={Colors.secondaryCore}
                curved
                curveType={CurveType.QUADRATIC}
                isAnimated />

            <AppSpacer size={Constants.SPACE_LARGE} />

            <AppButton
                isPrimary
                label="How are you feeling today?"
                onPress={() => console.log('')}
                buttonStyle={styles(isDarkMode).buttonStyle} />
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    logTitle: {
        fontFamily: "poppins_semibold"
    },
    buttonStyle: {
        borderRadius: Constants.SPACE_LARGE
    }
})

export default MoodPage