import { StyleSheet, TouchableOpacity } from 'react-native'

// components
import { AppText } from '../'

// shared
import { Constants, Theme } from '../../shared'

interface propTypes {
    label: string,
    onPress: () => void,
    isPrimary?: boolean,
    showIcon?: boolean,
}

const AppButton = (props: propTypes) => {


    return (
        <TouchableOpacity onPress={props.onPress} style={{
            ...styles.container,
            backgroundColor: Theme.dark.colors.surface
        }}>
            <AppText text={props.label} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        paddingVertical: Constants.SPACE_SMALL,
        paddingHorizontal: Constants.SPACE_SMALL / 2,
        borderRadius: Constants.SPACE_SMALL / 2
    }
})

export default AppButton