import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'

// components
import { AppText, AppTextField, AppSpacer, AppButton } from '../../../components'

// shared
import { Colors, Constants, Theme } from '../../../shared/'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

// navigation
import { Routes } from '../../../navigation'

interface PropTypes {
    onPress: () => void
}

const RegisterPage = ({ onPress }: PropTypes) => {
    const isDarkMode: boolean = useIsDarkMode()
    const navigation = useNavigation()

    return (
        <ScrollView>
            <AppText text='Create Account' textStyle={styles(isDarkMode).titleStyle} />
            <AppText text="Sign up to continue" textStyle={{
                ...styles(isDarkMode).subTitle,
            }} />

            <AppSpacer size={Constants.SPACE_LARGE * 2} isVertical={true} />

            <AppTextField label='Email Address'
                placeholder='Enter email address' />

            <AppTextField label="Password" placeholder="Enter password" />

            <AppSpacer size={Constants.SPACE_MEDIUM} />

            <AppButton label='Sign Up' onPress={() => navigation.navigate(Routes.bottomNav,{})} isPrimary />

            <AppSpacer size={Constants.SPACE_SMALL} />

            {/* link to register  */}
            <View style={styles(isDarkMode).footerContainer}>
                <AppText text="Already have an account ? " textStyle={styles(isDarkMode).footerSectionOne} fontSize={12} />
                <TouchableOpacity onPress={() => {
                    onPress()
                }}>
                    <AppText text="Sign In" textStyle={styles(isDarkMode).footerSectionTwo} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
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

export default RegisterPage