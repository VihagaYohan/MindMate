import React from 'react'
import { StyleSheet, View, } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

// components
import { AppText, AppContainer } from '../../../components'

// hooks
import { useTheme } from '../../../hooks'

// shared
import { Constants, Colors } from '../../../shared'

// navigation
import { Routes } from '../../../navigation'
import { RootStackParamList } from '../../../navigation/RootStackParamList'

type ResourceDetailsRouteProp = RouteProp<RootStackParamList, Routes.resourceDetails>

const ResourceDetailsPage = () => {
    const isDarkMode: boolean = useTheme()
    const route = useRoute<ResourceDetailsRouteProp>()

    return (
        <AppContainer>
            <AppText
                text={`resource id ${route.params?.id ?? 'N/A'}`} />
        </AppContainer>
    )
}

const styles = (isDarkMode: boolean = false) => StyleSheet.create({

})

export default ResourceDetailsPage