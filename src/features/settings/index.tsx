import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

// components
import { AppContainer, AppText, AppSpacer } from '../../components'

// service
import { UserService } from '../../services'

// shared
import { AppAvatar, Constants } from '../../shared'

// hoooks
import { useTheme } from '../../hooks'

const SettingsPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const isDarkMode: boolean = useTheme()

    useEffect(() => {
        fetchUserDetails()
    }, [])


    const fetchUserDetails = async () => {
        try {
            setLoading(true)
            const userService = new UserService();
            const result = await userService.currentUser()

            console.log(result)
        } finally {
            setLoading(false)
        }
    }

    return <AppContainer>
        <View style={styles(isDarkMode).headerContainer}>
            <AppAvatar
                firstName='Vihanga'
                lastName='Yohan' />

            <AppSpacer isVertical size={Constants.SPACE_MEDIUM} />

            <AppText
                text="VIHANGA YOHAN"
                textStyle={styles(isDarkMode).profileName}
                fontSize={14} />
        </View>


    </AppContainer>

}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    headerContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        fontFamily: 'poppins_semibold'
    }
})

export default SettingsPage