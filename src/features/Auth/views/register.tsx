import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import * as Yup from 'yup'

// components
import { AppText, AppSpacer, AppModal } from '../../../components'

// shared
import { Colors, Constants, Theme, AppForm, AppFormField, AppFormButton } from '../../../shared/'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

// services
import { AuthService } from '../../../services'

// navigation
import { Routes } from '../../../navigation'

// store
import { StateType, useStore } from '../../../store'

interface PropTypes {
    onPress: () => void
}

// form validation
const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email format").label("Email").required("Email is required"),
    password: Yup.string().min(6, 'Password at-least have 6 characters').required("Password is required")
})

const RegisterPage = ({ onPress }: PropTypes) => {
    const isDarkMode: boolean = useIsDarkMode()
    const navigation = useNavigation<any>()


    const registerUser = async (credentials: { email: string, password: string }) => {
        const authService = new AuthService()
        const result = await authService.userRegister(credentials)

        console.log(result)
        if (result.statusCode !== 200) {
            useStore.setState({
                loading: true,
                isError: true,
                errorMessage: result.data.message
            })
        } else {
            navigation.navigate(Routes.bottomNav, {})
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: registerUser,
    })


    const handleRegister = (values: { email: string, password: string }) => {
        mutate(values)

        if (isPending) {
            useStore((state) => {
                (state as StateType).loading = true
            })
        }
    }

    const handleClose = (value: boolean) => {
        useStore.setState({
            loading: false,
            isError: false,
        })
    }


    return (
        <View>
            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles(isDarkMode).container}>


                    <AppText text='Create Account' textStyle={styles(isDarkMode).titleStyle} />
                    <AppText text="Sign up to continue" textStyle={{
                        ...styles(isDarkMode).subTitle,
                    }} />

                    <AppSpacer size={Constants.SPACE_LARGE * 2} isVertical={true} />

                    <AppForm
                        initialValues={{
                            email: '',
                            password: ""
                        }}
                        validationSchema={validation}
                        onSubmit={values => handleRegister(values)}>


                        <AppFormField
                            name="email"
                            label='Email Address'
                            placeholder='Enter email address'
                            inputMode='email-address' />


                        <AppSpacer size={Constants.SPACE_SMALL} />

                        <AppFormField
                            name="password"
                            label="Password"
                            placeholder="Enter password"
                            secureTextEntry={true} />

                        <AppSpacer size={Constants.SPACE_MEDIUM} />

                        <AppFormButton
                            label='Sign Up'
                            isPrimary />

                    </AppForm>

                    <AppSpacer size={Constants.SPACE_SMALL} />


                    <View style={styles(isDarkMode).footerContainer}>
                        <AppText text="Already have an account ? " textStyle={styles(isDarkMode).footerSectionOne} fontSize={12} />
                        <TouchableOpacity onPress={() => {
                            onPress()
                        }}>
                            <AppText text="Sign In" textStyle={styles(isDarkMode).footerSectionTwo} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            <AppModal
                visible={useStore((state) => (state as StateType).isError)}
                onClose={(value) => handleClose(value)} />

        </View>
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

export default RegisterPage