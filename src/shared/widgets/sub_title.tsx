import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

// components
import { AppText } from '../../components'

// shared
import { Theme, Colors, Constants } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

interface propTypes {
    title: string,
    actionTitle?: string,
    onPress?: () => void
}

const SubTitle = ({ title, actionTitle, onPress }: propTypes) => {
    const isDarkMode = useTheme()

    return (
        <View style={styles(isDarkMode).container}>
            <AppText text={title} fontSize={13} textStyle={styles(isDarkMode).titleStyle} />

            {actionTitle && (
                <TouchableOpacity
                    style={styles(isDarkMode).actionTitleContainer}
                    onPress={() => onPress()}>
                    <AppText text={actionTitle} fontSize={10} textStyle={styles(isDarkMode).actionTitleStyle} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    titleStyle: {
        fontFamily: "poppins_semibold",
    },

    actionTitleContainer: {
        paddingBottom: Constants.SPACE_SMALL / 5,
        borderBottomColor: Colors.primaryCore,
        borderBottomWidth: 1
    },

    actionTitleStyle: {
        color: Colors.primaryCore,
        fontFamily: 'poppins_bold'
    }
})

export default SubTitle