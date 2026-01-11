import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FilterIcon, Check } from 'lucide-react-native';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// components
import { AppContainer, AppSpacer, AppText } from '../../components';

// shared
import { Colors, Constants, HeaderBackButton, SearchFeild } from '../../shared';

// hooks
import { useTheme } from '../../hooks';

// navigation
import { RootStackParamList } from '../../navigation/RootStackParamList';
import { Routes } from '../../navigation';

// service
import { ResourcesService } from '../../services';

// models
import { Resource } from '../../data/models';

// widgets
import { ResourceCard } from './widgets/';
import categories from '../../data/categories';

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>;

const ResourcesPage = ({ navigation }: propTypes) => {
    const isDarkMode: boolean = useTheme();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [resources, setResources] = useState<Resource[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

    // setting up header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Resources',
            headerLeft: () => {
                return <HeaderBackButton />;
            },
            headerTitleAlign: 'center',
        });
    }, []);

    useEffect(() => {
        // fetchResources
    }, [])

    // callback
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handle sheet changes', index);
    }, []);

    // fetch resources
    const fetchResources = async (categoryId: string | null) => {
        const resourcesService = new ResourcesService();
        const result = await resourcesService.getResources();

        const { data } = result.data;
        return data;
    };

    const resourceQuery = useQuery({
        queryKey: ['Resources', selectedCategoryId],
        queryFn: () => fetchResources(selectedCategoryId),
    });

    /*   const fetchResources = async () => {
        try {
          setIsLoading(true)
          const resourcesService = new ResourcesService()
          const result = await resourcesService.getResources()
    
          console.log('loading')
    
          const { data } = result.data
          console.log(result)
          setResources(data)
        } catch (e) {
          console.log('error occured')
        } finally {
          setIsLoading(false)
        }
      } */

    const renderResource = ({ item }: { item: Resource }) => {
        return <ResourceCard item={item} />;
    };

    const Filter = () => {
        return (
            <Pressable
                style={styles(isDarkMode).filterContainer}
                onPress={handlePresentModalPress}
            >
                <FilterIcon size={25} color={Colors.neutral80} />
            </Pressable>
        );
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AppContainer
                containerStyle={{
                    paddingVertical: Constants.SPACE_LARGE,
                }}
                isLoading={isLoading}
            >
                <View style={styles(isDarkMode).searchContainer}>
                    {/* <SearchFeild /> */}

                    <Filter />
                </View>

                <AppSpacer size={Constants.SPACE_MEDIUM} />

                <FlatList
                    keyExtractor={(item: { _id: any }) => `categories${item._id}`}
                    data={resourceQuery.data}
                    renderItem={renderResource}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                        <AppSpacer isVertical={true} size={Constants.SPACE_SMALL} />
                    )}
                />

                <BottomSheetModalProvider>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        onChange={handleSheetChanges}
                    >
                        <BottomSheetView style={styles(isDarkMode).contentContainer}>
                            {
                                categories.map((item, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            paddingVertical: 15,
                                            paddingHorizontal: 10,
                                            marginBottom: 5,
                                            borderRadius: 10,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}
                                            onPress={() => {
                                                setSelectedIndex(index)
                                                setSelectedCategoryId(item._id)
                                                // load resources

                                            }}>
                                            <AppText
                                                text={item.name}
                                                fontSize={12}
                                                textStyle={{ fontFamily: 'poppins_medium' }} />

                                            {
                                                selectedIndex === index && (
                                                    <Check size={25} color={Colors.primaryCore} />
                                                )
                                            }
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </AppContainer>
        </GestureHandlerRootView>
    );
};

const styles = (isDarkMode: boolean = false) =>
    StyleSheet.create({
        searchContainer: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: Constants.SPACE_MEDIUM,
            // Add spacing below search
        },
        filterContainer: {
            width: 50,
            height: 50,
            borderWidth: 1,
            borderColor: Colors.neutral80,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: Constants.SPACE_SMALL,
        },
        container: {
            flex: 1,
            backgroundColor: 'grey',
            borderWidth: 1,
        },
        contentContainer: {
            flex: 1,
            padding: 36,
        },
    });

export default ResourcesPage;
