import { StyleSheet, TextStyle, TouchableOpacity, ViewStyle, ActivityIndicator } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useFormikContext } from 'formik'

// components
import { AppText } from '../../../components'

// shared
import { Colors, Constants, Theme } from '../../'

// hooks
import { useTheme } from '../../../hooks'

// store
import { StateType, useStore } from '../../../store'

interface propTypes {
    label: string,
    isPrimary?: boolean,
    showIcon?: boolean,
    buttonStyle?: ViewStyle,
    labelStyle?: TextStyle
}

const AppFormButton = (props: propTypes) => {
    const isDarkTheme = useTheme()
    const { handleSubmit } = useFormikContext()
    const loadingState = useStore((state) => (state as StateType).loading)

    return (
        <TouchableOpacity onPress={handleSubmit} style={{
            ...styles(isDarkTheme).container,
            backgroundColor: props.isPrimary ? Colors.primaryCore : isDarkTheme ? Theme.darkTheme.colors.surface : Theme.lightTheme.colors.surface,
            ...props.buttonStyle
        }}
            disabled={loadingState}>
            {loadingState === true ? (
                <ActivityIndicator size="small" color={Theme.darkTheme.colors.text} />
            ) : (
                <AppText text={props.label} textStyle={{
                    ...styles(isDarkTheme).labelStyle,
                    color: props.isPrimary ? Colors.neutral100 : isDarkTheme ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text,
                    ...props.labelStyle
                }} />
            )}

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

export default AppFormButton
