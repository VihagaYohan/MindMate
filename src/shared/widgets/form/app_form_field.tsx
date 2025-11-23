import React, { Component, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useFormikContext } from 'formik'

// components
import { AppText, AppSpacer } from '../../../components'

// widgets
import { AppFormError } from '../../'

// shared
import { Theme, Colors, Constants } from '../../'

// hooks
import { useTheme } from '../../../hooks'

interface propTypes {
    name: string
    label: string
    inputMode?: string
    placeholder?: string
    secureTextEntry?: boolean
}

const AppFormField = ({
    name,
    label,
    inputMode = "default",
    secureTextEntry = false,
    placeholder,
    ...otherProps }: propTypes) => {

    const { setFieldTouched, setFieldValue, handleChange, errors, touched, values } = useFormikContext()
    const isDarkTheme: boolean = useTheme()

    return (
        <React.Fragment>

            <AppText
                text={label}
                textStyle={styles(isDarkTheme).textStyle}
                fontSize={12} />

            <AppSpacer size={Constants.SPACE_SMALL} />

            <TextInput
                style={styles(isDarkTheme).inputField}
                placeholder={placeholder != undefined && placeholder.length > 0 ? placeholder : 'Type something here'}
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                value={(values as Record<string, any>)?.[name]?.toString() ?? ''}
                secureTextEntry={secureTextEntry}
                {...otherProps} />


            <AppFormError errorMessage={(errors as Record<string, any>)[name]} visible={(touched as Record<string, any>)[name]} />
        </React.Fragment>
    )
}

const styles = (isDarkTheme: boolean) => StyleSheet.create({
    textStyle: {
        fontFamily: 'poppins_medium',
        fontSize: RFValue(13),
        color: isDarkTheme ? Theme.darkTheme.colors.text :
            Theme.lightTheme.colors.text
    },

    inputField: {
        borderWidth: 2,
        borderColor: Colors.neutral80,
        borderRadius: Constants.SPACE_SMALL,
        paddingHorizontal: Constants.SPACE_SMALL,
        fontSize: RFValue(13),
        fontFamily: 'poppins_regular',
        fontWeight: '200',
        color: isDarkTheme ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
    }
})

export default AppFormField