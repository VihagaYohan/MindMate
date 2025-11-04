import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'
// components
import { AppContainer } from '../../components';
// widgets
import { OnboardingPageItem, Paginator, SwipeController } from './widgets';
// shared
import { Constants } from '../../shared';
// data
import { OnboardingList } from './data/';
// models
import OnboardingItem from './model/OnboardingItem.ts';
// navigation
import { Routes } from '../../navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList.ts';

type Props  = NativeStackScreenProps<RootStackParamList, Routes>

const OnboardingPage = ({navigation}: Props) => {
  const translateX: SharedValue<number> = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x;
    },
  });

  const renderItem = ({ item }: { item: OnboardingItem }) => {
    return <OnboardingPageItem item={item} />;
  };

  return (
    <AppContainer>
      <Animated.FlatList
        keyExtractor={(_, index) => `onboarding_item_${index}`}
        data={OnboardingList}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        renderItem={renderItem}
        pagingEnabled={true}
        scrollEventThrottle={16}
      />

      {/* controllers */}
      <View style={styles().controllerContainer}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{ flexDirection: 'row' }}>
          {OnboardingList.map((_, index) => {
            return (
              <Paginator
                key={`paginator_${index}`}
                index={index}
                translateX={translateX}
              />
            );
          })}
        </View>
        <SwipeController
          title='Next'
          onPress={() => navigation.navigate(Routes.login,{})}
          translateX={translateX}
        />
      </View>
    </AppContainer>
  );
};

const styles = () =>
  StyleSheet.create({
    controllerContainer: {
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: Constants.SPACE_LARGE,
      left: 0,
    },
  });

export default OnboardingPage;
