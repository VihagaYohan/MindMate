import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { SearchIcon } from 'lucide-react-native'

// hooks
import { useTheme } from '../../hooks'

// shared
import { Colors, Constants } from '../../shared'

const SearchField = () => {
    const isDarkMode: boolean = useTheme()

    return (
        <View style={styles(isDarkMode).container}>
            <SearchIcon
                size={20}
                color={Colors.neutral25} />

            <TextInput
                placeholder='Search'
            />
        </View>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        padding: Constants.SPACE_SMALL,
        borderWidth: 1.5,
        borderColor: Colors.neutral80,
        alignItems: 'center',
        borderRadius: Constants.SPACE_LARGE * 2
    }
})

export default SearchField
