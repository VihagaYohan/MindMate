import React from 'react'
import { StyleSheet, View } from 'react-native'

// components
import { AppText, AppButton, AppSpacer } from '../../../components'

// shared
import { Theme, Colors, Constants, DeviceUtils } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

// asses
import { Assessment } from '../../../assets/images/'

const AssessmentCard = () => {
    const isDarkMode = useTheme()

    const imageWidth = (DeviceUtils.SCREEN_WIDTH - ((Constants.SPACE_SMALL * 2) + (Constants.SPACE_MEDIUM * 2))) / 2

    return (
        <View style={styles(isDarkMode).container}>
            {/* content */}
            <View>
                <AppText text={`Track Your\nMental Health,\nTransform Your\nLife!`}
                    textStyle={styles(isDarkMode).text}
                    fontSize={16} />

                <AppSpacer size={Constants.SPACE_SMALL} />

                <AppButton
                    label='Start Assessment'
                    onPress={() => console.log('')}
                    buttonStyle={styles(isDarkMode).buttonStyle}
                    labelStyle={styles(isDarkMode).labelStyle} />
            </View>

            {/* image */}
            <View style={styles(isDarkMode).imageContainer}>
                <Assessment width={imageWidth} height={imageWidth} />
            </View>
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        borderRadius: Constants.SPACE_MEDIUM,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Constants.SPACE_MEDIUM,
        backgroundColor: Colors.primaryCore
    },
    text: {
        fontFamily: "poppins_semibold",
        color: Colors.neutral100
    },
    imageContainer: {

    },
    buttonStyle: {
        borderRadius: Constants.SPACE_LARGE,
        paddingHorizontal: Constants.SPACE_MEDIUM
    },
    labelStyle: {
        color: Colors.primaryCore
    }
})

export default AssessmentCard