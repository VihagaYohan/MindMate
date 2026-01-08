import React, { useEffect } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useQuery } from '@tanstack/react-query'

// components
import { AppContainer, AppLoader, AppSpacer, AppText } from '../../components'

// shared
import { Theme, Colors, SearchFeild, SearchField, Constants } from '../../shared'
import { getUserDetails, clearAllData } from '../../shared/services/persistentStorage'

// hooks
import { useTheme } from '../../hooks'

// service
import { MoodService } from '../../services'

// model
import { MoodEntry } from '../../data/models'

// widgets
import { MoodEntryCard } from './widgets'


const JournalPage = () => {
    const isDarkMode: boolean = useTheme()

    // fetch mood entries
    const fetchMoodEntries = async () => {
        const moodService = new MoodService
        const result = await moodService.getUserMood()

        const { data } = result.data
        const response = data.data
        return response
    }

    const userMoodQuery = useQuery({
        queryKey: ['Moods'],
        queryFn: fetchMoodEntries
    })

    const renderUserMood = ({ item }: { item: MoodEntry }) => {
        return (
            <MoodEntryCard item={item} />
        )
    }

    return (
        <AppContainer isLoading={false}>
            <React.Fragment>
                <View style={styles(isDarkMode).searchContainer}>

                </View>

                <FlatList
                    keyExtractor={(item: { _id: any }) => `mood${item._id}`}
                    data={userMoodQuery.data}
                    renderItem={renderUserMood}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <AppSpacer
                        isVertical
                        size={Constants.SPACE_SMALL} />} />
            </React.Fragment>
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean) => StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',

    }
})

export default JournalPage