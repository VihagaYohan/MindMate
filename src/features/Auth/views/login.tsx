import { StyleSheet, ScrollView, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Formik } from 'formik'
import * as Yup from 'yup'

// components
import { AppContainer, AppText, AppTextField, AppSpacer, AppButton } from '../../../components'

// shared
import { Colors, Constants, Theme, AppForm, AppFormField, AppFormButton } from '../../../shared/'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

interface propTypes {
    onPress: () => void,
    onActionPress: () => void,
}

// form validation
const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email format").label("Email"),
    password: Yup.string().min(6, 'Password at-least have 6 characters').required('Password is required')
})

const LoginPage = ({ onPress, onActionPress }: propTypes) => {
    const isDarkMode = useIsDarkMode()

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
                        email: "",
                        password: ""
                    }}
                    validationSchema={validation}
                    onSubmit={values => console.log(values)}>

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
        fontSize: RFValue(20),
        color: Colors.primaryCore
    },
    subTitle: {
        fontFamily: 'poppins_regular',
        fontSize: RFValue(12),
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