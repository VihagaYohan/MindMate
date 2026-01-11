import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react-native'
import Video from 'react-native-video'
import YoutubePlayer from 'react-native-youtube-iframe'
import Pdf from 'react-native-pdf'
import { WebView } from 'react-native-webview'

// components
import { AppText, AppContainer, AppSpacer, AppButton, AppLoader } from '../../../components'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { Constants, Colors, HeaderBackButton, ErrorResponse, DeviceUtils, Theme } from '../../../shared'

// navigation
import { Routes } from '../../../navigation'
import { RootStackParamList } from '../../../navigation/RootStackParamList'

// model
import { Resource } from '../../../data/models'

// service
import { ResourcesService } from '../../../services'

// widgets
import { DetailsContent } from '../widgets'

type ResourceDetailsRouteProp = RouteProp<RootStackParamList, Routes.resourceDetails>


const ResourceDetailsPage = () => {
    const isDarkMode: boolean = useTheme()
    const route = useRoute<ResourceDetailsRouteProp>()
    const navigation = useNavigation()
    const [showContent, setShowContent] = useState<boolean>(false)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "",
            headerLeft: () => {
                return (
                    <HeaderBackButton />
                )
            },
            headerTitleAlign: 'center',
        })
    }, [])

    // fetch resource
    const fetchResource = async () => {
        const resourceService = new ResourcesService
        const result = await resourceService.getResourceById(route.params.id)
        console.log(result)

        return result
    }

    const { data: result, isLoading, isError } = useQuery({
        queryKey: ['Resources', route.params.id],
        queryFn: fetchResource
    })

    const resource: Resource | ErrorResponse = result?.data

    const isResource = (data: any): data is Resource => {
        return data && '_id' in data;
    }

    // Extract YouTube video ID from URL
    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }



    return (
        <AppContainer
            isLoading={isLoading}
            isError={isError}>

            <ScrollView
                contentContainerStyle={styles(isDarkMode).scrollContent}
                showsVerticalScrollIndicator={false}>

                <AppSpacer
                    isVertical
                    size={Constants.SPACE_MEDIUM * 2} />

                {isResource(resource) && (
                    <DetailsContent content={resource} />
                )}

                {/* Add extra padding at bottom for better UX */}
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* View Content Button - Absolutely Positioned */}
            {isResource(resource) && (
                <AppButton
                    isPrimary
                    label="View Content"
                    buttonStyle={styles(isDarkMode).viewContentButton}
                    onPress={() => {
                        setShowContent(true)
                    }}
                />
            )}


            <Modal
                visible={showContent}
                animationType='slide'>
                <View style={{ flex: 1, padding: Constants.SPACE_SMALL }}>

                    <TouchableOpacity
                        style={styles(isDarkMode).closeButtonContainer}
                        onPress={() => setShowContent(false)}>
                        <X
                            size={20}
                            color={Theme.darkTheme.colors.error} />
                    </TouchableOpacity>

                    <AppSpacer
                        isVertical
                        size={Constants.SPACE_MEDIUM} />

                    {isResource(resource) && (

                        <React.Fragment>

                            {resource.resourceType === 'video' ? (
                                <YoutubePlayer
                                    height={300}
                                    videoId={getYouTubeVideoId(resource.resourceUrl)}
                                    play={false}
                                    onChangeState={(state: any) => console.log(state)} />
                            ) : resource.resourceType === 'document' ? (
                                <WebView
                                    source={{
                                        uri: resource.resourceType
                                    }}
                                    style={styles(isDarkMode).webview}
                                    startInLoadingState={true}
                                    renderLoading={() =>
                                        <AppLoader />
                                    }
                                    onError={(syntheticEvent) => {
                                        const { nativeEvent } = syntheticEvent;
                                        console.warn('WebView error: ', nativeEvent);
                                    }}
                                />
                            ) : (
                                <WebView
                                    source={{
                                        uri: `https://docs.google.com/viewer?url=${encodeURIComponent(resource.resourceUrl)}&embedded=true`
                                    }}
                                    style={styles(isDarkMode).webview}
                                    startInLoadingState={true}
                                    renderLoading={() => (
                                        <AppLoader />
                                    )}
                                    onError={(syntheticEvent) => {
                                        const { nativeEvent } = syntheticEvent;
                                        console.warn('WebView error: ', nativeEvent);
                                    }} />
                            )}

                        </React.Fragment>

                    )}
                </View>
            </Modal>
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    image: {
        width: DeviceUtils.SCREEN_WIDTH - (Constants.SPACE_MEDIUM * 2),
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    title: {
        fontFamily: "poppins_semibold",
        textAlign: 'center'
    },
    description: {
        fontFamily: 'poppins_regular',
        textAlign: 'justify'
    },
    scrollContent: {
        flexGrow: 1
    },

    viewContentButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        alignItems: 'center',
    },
    viewContentText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButtonContainer: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.neutral60,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    webview: {
        flex: 1
    }

})

export default ResourceDetailsPage