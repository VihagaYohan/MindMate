import { StyleSheet, ScrollView } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// components
import { AppContainer, AppText, AppTextField, AppSpacer } from '../../../components'

// shared
import { Colors, Constants, Theme } from '../../../shared/'

// hooks
import useIsDarkMode from '../../../hooks/useTheme'

const LoginPage = () => {
    const isDarkMode = useIsDarkMode()

    return (
        <ScrollView>
            <AppText text='Create Account' textStyle={styles(isDarkMode).titleStyle} />
            <AppText text="Sign up to continue" textStyle={{
                ...styles(isDarkMode).subTitle,
            }} />

            <AppSpacer size={Constants.SPACE_LARGE * 2} isVertical={true} />

            <AppTextField label='Email Address'
                placeholder='Enter email address' />
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
    }
})

export default LoginPage