import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native'

// components
import { AppText, AppSpacer, AppButton, AppLoader } from '../../../components'

// shared
import { Colors, Constants, Theme, AppForm, AppFormField, AppFormButton, Storage } from '../../../shared/'
import { savePayload } from '../../../shared/utils/Storage'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

// services
import { AuthService } from '../../../services'

// navigation
import { Routes } from '../../../navigation'

// store
import { useStore } from '../../../store'


interface propTypes {
    onPress: () => void,
    onActionPress: () => void,
}

// form validation
const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email format").label("Email").required('Email is required'),
    password: Yup.string().min(6, 'Password at-least have 6 characters').required('Password is required')
})

const LoginPage = ({ onPress, onActionPress }: propTypes) => {
    const isDarkMode = useIsDarkMode()
    const navigation = useNavigation<any>()
    const [loading, setLoading] = useState<boolean>(false)


    const handleLogin = async (values: { email: string, password: string }) => {
        setLoading(true)
        const authService = new AuthService()
        const result = await authService.userLogin(values)
        //console.log(result)

        setLoading(false)
        if (result.statusCode === 200) {
            console.log(result)
            navigation.navigate(Routes.bottomNav)
        }

        setLoading(false)
    }

    if (loading) {
        return (
            <AppLoader />
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles(isDarkMode).container}>

                <AppText text='Login Account' textStyle={styles(isDarkMode).titleStyle} />
                <AppText text="Welcome back!" textStyle={{
                    ...styles(isDarkMode).subTitle,
                }} />

                <AppSpacer size={Constants.SPACE_LARGE * 2} isVertical={true} />

                <AppForm
                    initialValues={{
                        email: "vihagayohan94@gmail.com",
                        password: "Batman"
                    }}
                    validationSchema={validation}
                    onSubmit={values => handleLogin(values)}>

                    <AppFormField
                        name="email"
                        label="Email Address"
                        placeholder='Enter your email address'
                        inputMode="email-address" />

                    <AppSpacer size={Constants.SPACE_MEDIUM} />

                    <AppFormField
                        name="password"
                        label="Password"
                        placeholder='Enter your password'
                        secureTextEntry={true} />

                    <AppSpacer size={Constants.SPACE_MEDIUM} />

                    <AppFormButton
                        label="Sign In"
                        isPrimary />
                </AppForm>

                <AppSpacer size={Constants.SPACE_SMALL} />

                {/* link to register  */}
                <View style={styles(isDarkMode).footerContainer}>
                    <AppText text="Don't have an account ? " textStyle={styles(isDarkMode).footerSectionOne} fontSize={12} />
                    <TouchableOpacity onPress={() => onPress()}>
                        <AppText text="Sign Up" textStyle={styles(isDarkMode).footerSectionTwo} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        flex: 1
    },
    titleStyle: {
        fontFamily: "poppins_bold",
        fontSize: RFValue(24),
        color: Colors.primaryCore
    },
    subTitle: {
        fontFamily: 'poppins_regular',
        fontSize: RFValue(15),
        fontWeight: "700",
        color: isDarkMode ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
    },
    footerContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginVertical: Constants.SPACE_MEDIUM
    },
    footerSectionOne: {
        fontFamily: "poppins_semibold",
    },
    footerSectionTwo: {
        fontFamily: "poppins_semibold",
        color: Colors.primaryCore
    }
})

export default LoginPage