import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ChevronLeft } from 'lucide-react-native';
import Slider from '@react-native-community/slider';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';

// components
import { AppContainer, AppSpacer, AppText } from '../../../components';

// shared
import {
  AppForm,
  AppFormButton,
  AppFormField,
  Colors,
  Constants,
  DeviceUtils,
  Theme,
} from '../../../shared';

// hooks
import { useTheme } from '../../../hooks';

// service
import { MoodService } from '../../../services';

// models
import { AddMoodRequest } from '../../../services/moods';

// navigation
import { RootStackParamList } from '../../../navigation/RootStackParamList';
import { Routes } from '../../../navigation';

// store
import { StateType, useStore } from '../../../store';

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>;

// validation
const validation = Yup.object().shape({
  moodInput: Yup.string().min(10).required('Mood input is required'),
});

const MoodEntry = ({ navigation }: propTypes) => {
  const isDarkMode = useTheme();
  const [sliderState, setSliderState] = useState(1.5);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Shared animation value
  const moodValue = useSharedValue(1.5);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerBtn}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeft
            size={20}
            color={
              isDarkMode
                ? Theme.darkTheme.colors.text
                : Theme.lightTheme.colors.text
            }
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  // ---------------- BACKGROUND COLOR ----------------
  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      moodValue.value,
      [0, 1.5, 3],
      ['#ce5a3d', '#a3a39a', '#18e06c'],
    ),
  }));

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  }, []);

  // Emoji size
  const emojiSize = containerSize.width ? containerSize.width / 1.3 : 120;

  // Calculate offset for horizontal movement
  const maxOffset = containerSize.width ? containerSize.width / 3 : 100;

  // ---------------- ENHANCEMENTS ----------------
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const shake = useSharedValue(0);

  const triggerEnhancements = (value: number) => {
    // Bounce
    scale.value = withSequence(withSpring(1.15), withSpring(1));

    // Rotate
    rotation.value = withTiming(value === 0 ? -10 : value === 3 ? 10 : 0, {
      duration: 300,
    });

    // Shake only when sad
    if (value === 0) {
      shake.value = withSequence(
        withTiming(-10, { duration: 60 }),
        withTiming(10, { duration: 60 }),
        withTiming(-6, { duration: 60 }),
        withTiming(6, { duration: 60 }),
        withTiming(0, { duration: 60 }),
      );
    } else {
      shake.value = 0;
    }
  };

  // ---------------- EMOJI STYLES ----------------
  const emojiContainerStyle = useAnimatedStyle(() => ({
    transform: [
      // Horizontal sliding based on mood value
      {
        translateX: interpolate(
          moodValue.value,
          [0, 1.5, 3],
          [-maxOffset, 0, maxOffset],
        ),
      },
      // Bounce scale
      { scale: scale.value },
      // Shake for sad
      { translateX: shake.value },
      // Rotate
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const sadOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(moodValue.value, [0, 1], [1, 0]),
  }));

  const neutralOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(moodValue.value, [0.8, 1.5, 2.2], [0, 1, 0]),
  }));

  const happyOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(moodValue.value, [2, 3], [0, 1]),
  }));

  // ---------------- SLIDER ----------------
  const handleSliderChange = (value: number) => {
    setSliderState(value);
    moodValue.value = withTiming(value, { duration: 300 });
    triggerEnhancements(value);
  };

  // ---------------- SUBMIT ----------------
  const addMoodEntry = async (content: AddMoodRequest) => {
    const moodService = new MoodService();
    return moodService.addMood(content);
  };

  const { mutate } = useMutation({ mutationFn: addMoodEntry });

  const handleAddingMood = (values: { moodInput: string }) => {
    mutate({
      level: moodValue.value,
      description:
        moodValue.value === 0
          ? 'sad'
          : moodValue.value <= 1.5
          ? 'neutral'
          : 'happy',
      notes: values.moodInput,
    });

    useStore(state => {
      (state as StateType).loading = true;
    });
  };

  return (
    <AppContainer>
      <AppText
        text="How are you feeling today?"
        textStyle={styles(isDarkMode).title}
        fontSize={14}
      />

      {/* EMOJI CONTAINER */}
      <Animated.View
        style={[styles(isDarkMode).emojiContainer, backgroundStyle]}
        onLayout={onLayout}
      >
        <Animated.View style={[styles.emojiWrapper, emojiContainerStyle]}>
          <Animated.Text
            style={[styles.emoji, { fontSize: emojiSize }, sadOpacity]}
          >
            😢
          </Animated.Text>

          <Animated.Text
            style={[styles.emoji, { fontSize: emojiSize }, neutralOpacity]}
          >
            😐
          </Animated.Text>

          <Animated.Text
            style={[styles.emoji, { fontSize: emojiSize }, happyOpacity]}
          >
            😄
          </Animated.Text>
        </Animated.View>
      </Animated.View>

      {/* SLIDER */}
      <Slider
        style={styles.slider}
        value={sliderState}
        onValueChange={handleSliderChange}
        minimumValue={0}
        maximumValue={3}
        minimumTrackTintColor={Colors.primaryCore}
        maximumTrackTintColor={Colors.neutral80}
        thumbTintColor={Colors.primaryCore}
      />

      {/* FORM */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppForm
          initialValues={{ moodInput: '' }}
          validationSchema={validation}
          onSubmit={handleAddingMood}
        >
          <AppFormField name="moodInput" placeholder="Type what you feel" />

          <AppSpacer size={Constants.SPACE_MEDIUM} />

          <AppFormButton label="Submit" isPrimary />
        </AppForm>
      </KeyboardAvoidingView>
    </AppContainer>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    headerBtn: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'poppins_semibold',
      alignSelf: 'center',
      color: isDarkMode
        ? Theme.darkTheme.colors.text
        : Theme.lightTheme.colors.text,
    },
    emojiContainer: {
      flex: 1,
      borderWidth: 1,
      borderRadius: Constants.SPACE_MEDIUM,
      borderColor: Colors.neutral80,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    emojiWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    emoji: {
      position: 'absolute',
      textAlign: 'center',
    },
    slider: {
      width: DeviceUtils.SCREEN_WIDTH - Constants.SPACE_MEDIUM * 2,
      alignSelf: 'center',
      height: 40,
    },
  });

export default MoodEntry;
