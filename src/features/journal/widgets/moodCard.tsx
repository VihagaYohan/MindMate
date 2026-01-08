import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, LayoutAnimation } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

// component
import { AppText } from '../../../components'

// hooks
import { useTheme } from '../../../hooks'

// constants
import { Constants, Colors, Theme } from '../../../shared'

// model
import { MoodEntry } from '../../../data/models'

// navigation
import { Routes } from '../../../navigation'
import { RootStackParamList } from '../../../navigation/RootStackParamList'

interface propTypes {
    item: MoodEntry
}

const ICONS_SIZE = 20

const JournalCard = ({ item }: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const params = useRoute()
    const [expanded, setExpanded] = useState<boolean>(false)
    const [totalLines, setTotalLines] = useState<number>(0)


    const toggleExpand = () => {
        LayoutAnimation.configureNext(
            LayoutAnimation.Presets.easeInEaseOut
        )
        setExpanded(prev => !prev)
    }

    const showReadMore = totalLines >= 2

    const getTextColor = (text: string): string => {
        if (text == "Suicidal") {
            return Theme.darkTheme.colors.error
        } else if (text == "Depression") {
            return "#FFA500"
        }

    }

    const getDate = (text: string) => {
        const d = new Date(text)

        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    return (
        <View
            style={styles(isDarkMode).itemContainer}>

            <View style={styles(isDarkMode).header}>
                <AppText
                    text={item.prediction}
                    fontSize={11}
                    textStyle={{
                        ...styles(isDarkMode).prediction,
                        color: getTextColor(item.prediction)
                    }} />

                <AppText
                    text={getDate(item.createdAt)}
                    fontSize={11} />
            </View>

            <AppText
                text={item.notes}
                fontSize={12}
                numberOfLines={expanded ? undefined : 2}
                onTextLayout={(e) => {
                    if (totalLines === 0) {
                        setTotalLines(e.nativeEvent.lines.length)
                    }
                }} />

            {showReadMore && (
                <TouchableOpacity
                    onPress={toggleExpand}>
                    <AppText
                        text={expanded ? 'Read less' : 'Read more'}
                        fontSize={10}
                        textStyle={styles(isDarkMode).expand} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    itemContainer: {
        paddingVertical: Constants.SPACE_MEDIUM,
        paddingHorizontal: Constants.SPACE_MEDIUM,
        borderRadius: Constants.SPACE_MEDIUM,
        borderWidth: 1,
        borderColor: Colors.neutral60,
        backgroundColor: isDarkMode ? Theme.darkTheme.colors.surface :
            Theme.lightTheme.colors.background
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    prediction: {
        fontFamily: 'poppins_bold',
    },
    expand: {
        fontFamily: 'poppins_semibold',
        color: Colors.primary
    }
})

export default JournalCard