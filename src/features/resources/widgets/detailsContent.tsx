import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient'

// components
import { AppText } from '../../../components'

// constants
import { Colors, Constants, DeviceUtils } from '../../../shared'

// hooks
import { useTheme } from '../../../hooks'

// models
import { Resource } from '../../../data/models'

const DESCRIPTION_LIMIT: number = 150

type propTypes = {
    content: Resource
}

const DetailsContent: React.FC<propTypes> = ({
    content
}: propTypes) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const isDarkMode: boolean = useTheme()

    const shouldTruncate: boolean = content.description.length > DESCRIPTION_LIMIT
    const displayDescription = isExpanded || !shouldTruncate ? content.description :
        `${content.description?.substring(0, DESCRIPTION_LIMIT)}...`

    // Dynamic gradient colors based on theme
    const gradientColors = isDarkMode
        ? ['transparent', 'rgba(18, 18, 18, 0.7)', '#121212'] // Dark mode
        : ['transparent', 'rgba(255, 255, 255, 0.7)', '#FFFFFF']; // Light mode    

    return (
        <View style={{
            flex: 1
        }}>
            <Image
                source={{ uri: content.thumbnail }}
                style={styles(isDarkMode).banner} />

            {/* gradient overlay */}
            <LinearGradient
                colors={gradientColors}
                locations={[0, 0.5, 1]}
                style={styles(isDarkMode).gradient}>

                <View style={styles(isDarkMode).content}>
                    <AppText
                        text={content.title}
                        fontSize={15}
                        textStyle={styles(isDarkMode).title} />

                    <AppText
                        text={displayDescription}
                        fontSize={13}
                        textStyle={styles(isDarkMode).description} />

                    {/* Read More/Less Button */}
                    {shouldTruncate && (
                        <TouchableOpacity
                            onPress={() => setIsExpanded(!isExpanded)}
                            style={styles(isDarkMode).readMoreButton}
                        >
                            <AppText
                                text={isExpanded ? 'Read less' : 'Read more'}
                                style={styles(isDarkMode).readMoreText}
                            />
                        </TouchableOpacity>
                    )}



                </View>

            </LinearGradient>
        </View>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    banner: {
        width: DeviceUtils.SCREEN_WIDTH - (Constants.SPACE_MEDIUM * 2),
        aspectRatio: 1,
        resizeMode: 'cover',
    },
    gradient: {
        flex: 1
    },
    content: {
        padding: Constants.SPACE_MEDIUM,
    },
    title: {
        fontFamily: "poppins_semibold",
        textAlign: 'center'
    },
    description: {
        fontFamily: 'poppins_regular',
        textAlign: 'justify'
    },
    readMoreButton: {
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    readMoreText: {
        color: Colors.primaryCore,
        fontSize: 14,
        fontWeight: '600',
    },

})

export default DetailsContent



