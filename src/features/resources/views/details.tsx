import React, { useLayoutEffect } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'

// components
import { AppText, AppContainer, AppSpacer, AppButton } from '../../../components'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { Constants, Colors, HeaderBackButton, ErrorResponse, DeviceUtils } from '../../../shared'

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
            <AppButton
                isPrimary
                label="View Content"
                buttonStyle={styles(isDarkMode).viewContentButton}
                onPress={() => {
                    // Handle view content action
                    console.log('View content pressed');
                }}
            />
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
})

export default ResourceDetailsPage