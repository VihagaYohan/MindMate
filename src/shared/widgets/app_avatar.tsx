import { StyleSheet, View } from 'react-native'

// components
import { AppText } from '../../components'

// shared
import { Theme, Colors } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

const SIZE = 100

interface propTypes {
    firstName?: string
    lastName?: string
}

const AppAvatar = ({ firstName = "", lastName = "" }: propTypes) => {
    const isDarkMode: boolean = useTheme()

    const handleDisplayName = (firstName: string, lastName: string): string => {
        if (firstName.length > 0 && lastName.length > 0) {
            return firstName[0].concat(lastName[0]).toUpperCase()
        } else if (firstName.length == 0 && lastName.length > 0) {
            return lastName[0]
        } else if (firstName.length > 0 && lastName.length == 0) {
            return firstName[0]
        }
        return ""
    }


    return (
        <View style={styles(isDarkMode).container}>
            <AppText
                text={handleDisplayName(firstName, lastName)}
                fontSize={20}
                textStyle={styles(isDarkMode).textStyle} />
        </View>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryCore,
        borderRadius: SIZE / 2,
    },
    textStyle: {
        fontFamily: "poppins_semibold",
        color: Colors.neutral99
    }
})

export default AppAvatar