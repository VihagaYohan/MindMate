import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// components
import { AppContainer, AppText, AppTextField, AppSpacer, AppButton } from '../../../components'

// shared
import { Colors, Constants, Theme } from '../../../shared/'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

interface propTypes {
    onPress: () => void,
    onNavigate: () => void
}

const LoginPage = ({ onPress, onNavigate }: propTypes) => {
    const isDarkMode = useIsDarkMode()

    return (
        <ScrollView>
            <AppText text='Login Account' textStyle={styles(isDarkMode).titleStyle} />
            <AppText text="Welcome back!" textStyle={{
                ...styles(isDarkMode).subTitle,
            }} />

            <AppSpacer size={Constants.SPACE_LARGE * 2} isVertical={true} />

            <AppTextField label='Email Address'
                placeholder='Enter email address' />

            <AppTextField label="Password" placeholder="Enter password" />

            <AppSpacer size={Constants.SPACE_MEDIUM} />

            <AppButton label='Sign In' onPress={() => onNavigate()} isPrimary />

            <AppSpacer size={Constants.SPACE_SMALL} />

            {/* link to register  */}
            <View style={styles(isDarkMode).footerContainer}>
                <AppText text="Don't have an account ? " textStyle={styles(isDarkMode).footerSectionOne} fontSize={12} />
                <TouchableOpacity onPress={() => onPress()}>
                    <AppText text="Sign Up" textStyle={styles(isDarkMode).footerSectionTwo} />
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

export default LoginPage