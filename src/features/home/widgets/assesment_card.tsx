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

interface propTypes {
    title: string
    buttonTitle: string
    backgroundColor: string
    onPress: () => void
}

const AssessmentCard = ({ title, buttonTitle, backgroundColor = Colors.primaryCore, onPress }: propTypes) => {
    const isDarkMode = useTheme()

    const imageWidth = (DeviceUtils.SCREEN_WIDTH - ((Constants.SPACE_SMALL * 2) + (Constants.SPACE_MEDIUM * 2))) / 2

    return (
        <View style={styles(isDarkMode, backgroundColor).container}>
            {/* content */}
            <View>
                <AppText text={title}
                    textStyle={styles(isDarkMode).text}
                    fontSize={16} />

                <AppSpacer size={Constants.SPACE_SMALL} />

                {/*  <AppButton
                    label={buttonTitle}
                    onPress={() => onPress()}
                    buttonStyle={styles(isDarkMode).buttonStyle}
                    labelStyle={styles(isDarkMode).labelStyle} /> */}
            </View>

            {/* image */}
            <View style={styles(isDarkMode).imageContainer}>
                <Assessment width={imageWidth} height={imageWidth} />
            </View>
        </View>
    )
}

const styles = (
    isDarkMode: boolean,
    backgroundColor: string = Colors.primaryCore) => StyleSheet.create({
        container: {
            backgroundColor: backgroundColor,
            borderRadius: Constants.SPACE_MEDIUM,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: Constants.SPACE_MEDIUM,
            overflow: 'hidden'
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