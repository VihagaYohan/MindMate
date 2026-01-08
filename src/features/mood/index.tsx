import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CurveType, LineChart } from 'react-native-gifted-charts';
import { useQuery } from '@tanstack/react-query';

// components
import { AppButton, AppContainer, AppSpacer, AppText } from '../../components';

// shared
import { Colors, Constants } from '../../shared';

// hooks
import { useTheme } from '../../hooks';

// widgets
import { PeriodPicker } from './widgets';

// navigation
import { Routes } from '../../navigation';

// service
import { MoodService } from '../../services';

// model

const MoodPage = () => {
  const isDarkMode = useTheme();
  const navigation = useNavigation();

  // fetch graph data for user mood
  const fetchGraphData = async () => {
    const moodService = new MoodService();
    const result = await moodService.getGraphData();

    const { data } = result.data;
    return data;
  };

  const moodQuery = useQuery({
    queryKey: ['mood-stat'],
    queryFn: fetchGraphData,
  });

  const data = [
    {
      value:10,
      label: "10:42"
    },
    {
      value: 8,
      label: "10:43"
    },
    {
      value: 5,
      label: "10:44"
    },
    {
      value: 8,
      label: "10:44"
    },
    {
      value: 5,
      label: "10:45"
    },
    {
      value: 3,
      label: "10:45"
    },
    {
      value: 7,
      label: "10:46"
    },
    {
      value: 3,
      label: "10:46"
    }
  ];

  return (
    <AppContainer>
      <View style={styles(isDarkMode).titleSection}>
        <AppText
          text="Mood Log"
          textStyle={styles(isDarkMode).logTitle}
          fontSize={14}
        />

        <PeriodPicker />
      </View>

      <AppSpacer size={Constants.SPACE_MEDIUM} />

      <LineChart
        data={moodQuery.data}
        color1={Colors.primaryCore}
        thickness={3}
        dataPointsColor={Colors.secondaryCore}
        curved
        curveType={CurveType.QUADRATIC}
        isAnimated
      />

      <AppSpacer size={Constants.SPACE_LARGE} />

      <AppButton
        isPrimary
        label="How are you feeling today?"
        onPress={() => navigation.navigate(Routes.moodEntry, {})}
        buttonStyle={styles(isDarkMode).buttonStyle}
      />
    </AppContainer>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    titleSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logTitle: {
      fontFamily: 'poppins_semibold',
    },
    buttonStyle: {
      borderRadius: Constants.SPACE_LARGE,
    },
  });

export default MoodPage;
