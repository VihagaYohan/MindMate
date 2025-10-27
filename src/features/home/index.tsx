import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View, Image } from 'react-native'

// components
import { AppContainer, AppLoader, AppSpacer, AppText } from '../../components'

// shared
import { Theme, Colors, Constants, SubTitle } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

// widgets
import { AssessmentCard, DeviceCard, WelcomeHeader } from './widgets'

// services
import { CategoryService } from '../../services'

// models
import { Category } from '../../data/models'

const SIZE = 80

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Category[]>([
        new Category(
            "68e26cf3e034a1559778ee48",
            "Anger",
            "#D32F2F",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-anger-64_azlp4o.png",
            "2025-10-05T13:04:51.104Z",
            "2025-10-05T13:04:51.104Z"
        ),
        new Category(
            "68e26d32e034a1559778ee4a",
            "Anxiety",
            "#9575CD",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-anxiety-64_ufd3bp.png",
            "2025-10-05T13:05:54.328Z",
            "2025-10-05T13:05:54.328Z"
        ),
        new Category(
            "68e26956ecafb9e684d9b184",
            "Depression",
            "#5C6BC0",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-depression-64_hpb9bw.png",
            "2025-10-05T12:49:26.714Z",
            "2025-10-05T12:49:26.714Z"
        ),
        new Category(
            "68e26d5de034a1559778ee4e",
            "Panic",
            "#00838F",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-panic-64_p0nnvo.png",
            "2025-10-05T13:06:37.500Z",
            "2025-10-05T13:06:37.500Z"
        ),
        new Category(
            "68e26d49e034a1559778ee4c",
            "Stress",
            "#B0BEC5",
            "https://res.cloudinary.com/dat02tisy/image/upload/v1752934990/icons8-stress-64_fkoo50.png",
            "2025-10-05T13:06:17.879Z",
            "2025-10-05T13:06:17.879Z"
        )
    ])
    const isDarkMode = useTheme()

    useEffect(() => {
        fetchCategories()
    }, [])

    // fetch categories
    const fetchCategories = async () => {
        /*         const categoryService = new CategoryService
                const result = await categoryService.getServices()
                console.log(result)
                if (result != undefined) {
                    setData(result)
                } */
    }

    const renderCategory = ({ item }: { item: Category }) => {
        return (
            <View style={styles(isDarkMode).categoryContainer}>
                <View style={styles(isDarkMode).categoryImageContainer}>
                    <Image source={{ uri: item.imageUrl }} style={styles(isDarkMode, item.backgroundColor).categoryImage} resizeMode='contain' />
                </View>

                <AppSpacer size={Constants.SPACE_SMALL} />

                <AppText text={item.title} textStyle={styles(isDarkMode).categoryTitle} fontSize={10} />
            </View>
        )
    }

    return (
        <AppContainer>

            <WelcomeHeader />

            <AppSpacer size={Constants.SPACE_LARGE} />

            <AssessmentCard
                title={`Track Your\nMental Health,\nTransform Your\nLife!`}
                buttonTitle="Start Assessment"
                backgroundColor={Colors.primaryCore}
                onPress={() => console.log("")} />

            <AppSpacer size={Constants.SPACE_MEDIUM} />

            <SubTitle title='Explore assessments' actionTitle='Show All' onPress={() => console.log('')} />

            <AppSpacer size={Constants.SPACE_MEDIUM} />

            <View>
                <FlatList
                    horizontal
                    keyExtractor={(item: { _id: any }) => `categories${item._id}`}
                    data={data}
                    renderItem={renderCategory}
                    showsHorizontalScrollIndicator={false} />
            </View>
            <AppSpacer size={Constants.SPACE_MEDIUM} />

            <DeviceCard
                title={`Connect\nYour Devices`}
                buttonTitle="Connect Device"
                backgroundColor={Colors.secondary95}
                onPress={() => console.log("")} />


        </AppContainer>
    )
}

const styles = (isDarkMode: boolean, backgroundColor: string = Colors.neutral100) => StyleSheet.create({
    categoryContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Constants.SPACE_SMALL / 2
    },
    categoryImageContainer: {
        width: SIZE,
        height: SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryImage: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        borderWidth: 2,
        borderColor: Colors.neutral70,
        backgroundColor: backgroundColor
    },
    categoryTitle: {
        fontFamily: "poppins_medium",
        color: Colors.neutral0
    }
})

export default HomePage