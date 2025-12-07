import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Video, BookOpenText } from 'lucide-react-native'

// component
import { AppText } from '../../../components'

// hooks
import { useTheme } from '../../../hooks'

// constants
import { Constants, Colors, Theme } from '../../../shared'

// model
import { Resource } from '../../../data/models'

interface propTypes {
    item: Resource
}

const ICON_SIZE: number = 20

const ResouceCard = ({ item }: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const navigation = useNavigation()


    return (
        <TouchableOpacity style={styles(isDarkMode).itemContainer}>
            <View style={styles(isDarkMode).thumbanilImageContainer}>
                <Image
                    source={{ uri: item.thumbnail }}
                    resizeMode='cover'
                    style={styles(isDarkMode).thumbnailImage} />
            </View>

            <View style={{ flex: 1, paddingHorizontal: Constants.SPACE_SMALL }}>
                <AppText
                    text={item.title}
                    numberOfLines={3}
                    fontSize={14}
                    textStyle={styles(isDarkMode).title} />


                <View style={styles(isDarkMode).resourceTypeContainer}>
                    <AppText
                        text="Resource Type"
                        fontSize={12}
                        textStyle={styles(isDarkMode).resourceType} />

                    {
                        item.resourceType === Constants.RESOURCETYPE.video ?
                            <Video
                                size={ICON_SIZE}
                                color={Colors.neutral50} /> : <BookOpenText
                                size={ICON_SIZE}
                                color={Colors.neutral50} />
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        paddingVertical: Constants.SPACE_MEDIUM,
        paddingHorizontal: Constants.SPACE_MEDIUM,
        borderRadius: Constants.SPACE_MEDIUM,
        backgroundColor: isDarkMode ? Theme.darkTheme.colors.surface : Theme.lightTheme.colors.surface
    },
    thumbanilImageContainer: {
        borderRadius: Constants.SPACE_SMALL,
        overflow: 'hidden',
    },
    thumbnailImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    title: {
        fontFamily: 'poppins_semibold',
    },
    resourceTypeContainer: {
        flexDirection: 'row'
    },
    resourceType: {
        fontFamily: 'poppoins_medium',
        marginRight: Constants.SPACE_MEDIUM
    }
})

export default ResouceCard