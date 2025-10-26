import { useState } from 'react'
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// components
import { AppSpacer, AppText } from '../index'

// shared
import { Colors, Constants, Theme } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

interface propTypes extends TextInputProps {
    label: string,
    placeholder?: string,
}

const AppTextField = ({ label, placeholder, ...props }: propTypes) => {
    const [value, setValue] = useState<string>('')
    const isDarkMode = useTheme();

    return (
        <View style={styles(isDarkMode).container}>
            <AppText text={label} textStyle={styles(isDarkMode).textStyle} fontSize={12} />

            <AppSpacer size={Constants.SPACE_SMALL} />
            <View>
                <TextInput
                    style={styles(isDarkMode).inputField}
                    value={value}
                    onChangeText={value => setValue(value)}
                    placeholder={placeholder}
                    keyboardType='default'
                    {...props} />
            </View>
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: Constants.SPACE_SMALL
    },

    textStyle: {
        fontFamily: 'poppins_medium',
        fontSize: RFValue(13),
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
    },

    inputField: {
        borderWidth: 2,
        borderColor: Colors.neutral80,
        borderRadius: Constants.SPACE_SMALL,
        paddingHorizontal: Constants.SPACE_SMALL,
        fontSize: RFValue(13),
        fontFamily: 'poppins_regular',
        fontWeight: '200'
    }
})

export default AppTextField