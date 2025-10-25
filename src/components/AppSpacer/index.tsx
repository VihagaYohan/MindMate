import { StyleSheet, View } from 'react-native'

// shared
import { Constants } from '../../shared'

interface propTypes {
    size: number,
    isVertical?: boolean
}

const AppSpacer = ({ size, isVertical = true }: propTypes) => {
    return (
        <View style={{
            height: isVertical ? size : 0,
            width: isVertical == false ? 0 : size
        }} />
    )
}

export default AppSpacer