import React, { useLayoutEffect, useRef, useCallback, useState } from 'react'
import { StyleSheet, View, Pressable, FlatList, Image } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FilterIcon } from 'lucide-react-native'
import BottomSheet, { BottomSheetView, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

// components
import { AppContainer, AppSpacer, AppText } from '../../components'

// shared
import { Theme, Colors, Constants, HeaderBackButton, SearchFeild } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

// navigation
import { RootStackParamList } from '../../navigation/RootStackParamList'
import { Routes } from '../../navigation'

// service
import { ResourcesService } from '../../services'

// models
import { Resource } from '../../data/models'

// widgets
import { ResourceCard } from './widgets/'

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>

const ResourcesPage = ({ navigation }: propTypes) => {
    const isDarkMode: boolean = useTheme()
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)

    // setting up header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Resources",
            headerLeft: () => {
                return (
                    <HeaderBackButton />
                )
            },
            headerTitleAlign: 'center',
        })
    }, [])

    // callback
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, [])

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handle sheet changes', index)
    }, [])

    // fetch resources
    const fetchResources = async () => {
        const resourcesService = new ResourcesService
        const result = await resourcesService.getResources()

        const { data } = result.data
        return data
    }

    const resourceQuery = useQuery({
        queryKey: ['Resources'],
        queryFn: fetchResources
    })

    const renderResource = ({ item }: { item: Resource }) => {
        return (
            <ResourceCard item={item} />
        )
    }


    const Filter = () => {
        return (
            <Pressable
                style={styles(isDarkMode).filterContainer}
                onPress={handlePresentModalPress}>
                <FilterIcon
                    size={25}
                    color={Colors.neutral80} />
            </Pressable>
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppContainer containerStyle={{
                paddingVertical: Constants.SPACE_LARGE
            }}>
                <View style={styles(isDarkMode).searchContainer}>
                    <SearchFeild />

                    <Filter />
                </View>

                <AppSpacer
                    size={Constants.SPACE_MEDIUM} />

                <FlatList
                    keyExtractor={(item: { _id: any }) => `categories${item._id}`}
                    data={resourceQuery.data}
                    renderItem={renderResource}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <AppSpacer
                        isVertical={true}
                        size={Constants.SPACE_SMALL} />} />

                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView style={styles(isDarkMode).contentContainer}>
                            <AppText
                                text="Awesome 🎉" />
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>

            </AppContainer>
        </GestureHandlerRootView>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Constants.SPACE_MEDIUM, // Add spacing below search
    },
    filterContainer: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.neutral80,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Constants.SPACE_SMALL
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
        borderWidth: 1
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        alignItems: 'center',
        backgroundColor: 'red'
    },
})

export default ResourcesPage