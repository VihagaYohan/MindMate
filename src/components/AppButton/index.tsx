import { StyleSheet, TouchableOpacity } from 'react-native'

// components
import { AppText } from '../'

// shared
import { Colors, Constants, Theme } from '../../shared'

// hooks
import { useTheme } from '../../hooks'
import { RFValue } from 'react-native-responsive-fontsize'

interface propTypes {
    label: string,
    onPress: () => void,
    isPrimary?: boolean,
    showIcon?: boolean,
}

const AppButton = (props: propTypes) => {
    const isDarkTheme = useTheme()

    return (
        <TouchableOpacity onPress={props.onPress} style={{
            ...styles(isDarkTheme).container,
            backgroundColor: props.isPrimary ? Colors.primaryCore : isDarkTheme ? Theme.darkTheme.colors.surface : Theme.lightTheme.colors.surface
        }}>
            <AppText text={props.label} textStyle={{
                ...styles(isDarkTheme).labelStyle,
                color: props.isPrimary ? Colors.neutral100 : isDarkTheme ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
            }} />
        </TouchableOpacity>
    )
}

const styles = (isDarkTheme: boolean) => StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primaryCore,
        paddingVertical: Constants.SPACE_SMALL,
        paddingHorizontal: Constants.SPACE_SMALL / 2,
        borderRadius: Constants.SPACE_SMALL / 2,
    },
    labelStyle: {
        fontFamily: "poppins_bold",
        fontSize: RFValue(13)
    }
})

export default AppButton