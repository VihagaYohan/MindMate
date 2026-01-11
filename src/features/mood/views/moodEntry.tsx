import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableOpacity
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
  ServerResponse,
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
import { Mood } from '../../../data/models';

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>;

// validation
const validation = Yup.object().shape({
  moodInput: Yup.string().min(10).required('Mood input is required'),
});

const emojis: any[] = ['😞', '😑', '😁']

const MoodEntry = ({ navigation }: propTypes) => {
  const isDarkMode = useTheme();
  const [sliderState, setSliderState] = useState(1.5);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<{ visible: boolean, response: string }>({ visible: false, response: 'Normal' })

  // Shared animation value
  const moodValue = useSharedValue(1.5);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
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
    setLoading(false)
    const response = await moodService.addMood(content);
    console.log(response.data)
    setResponse({ visible: true, response: response.data?.prediction })
    return response;
  };

  const { mutate } = useMutation({ mutationFn: addMoodEntry });

  const handleAddingMood = (values: { moodInput: string }) => {
    setLoading(true)

    const payload = {
      level: 5,
      description: selectedIndex === 0 ? 'sad' : selectedIndex === 1 ? 'neutral' : 'happy',
      notes: values.moodInput
    }

    mutate(payload)
  };

  return (
    <AppContainer isLoading={loading}>
      <AppText
        text="How are you feeling today?"
        textStyle={styles(isDarkMode).title}
        fontSize={14}
      />

      <AppSpacer
        isVertical
        size={Constants.SPACE_MEDIUM} />

      {/* EMOJI CONTAINER */}
      <View>
        <ScrollView
          contentContainerStyle={{
            width: "100%",
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-start',
          }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {emojis.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  ...styles(isDarkMode).emojiContainer,
                  marginRight: index != emojis.length - 1 ? Constants.SPACE_SMALL : 0,
                  borderWidth: selectedIndex === index ? 5 : 1,
                  borderColor: selectedIndex === index ? Colors.primary : Colors.neutral60,
                }}
                onPress={() => setSelectedIndex(index)}>
                <AppText
                  text={item}
                  fontSize={30} />
              </Pressable>
            )
          })}
        </ScrollView>
      </View>


      {/* FORM */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <AppForm
          initialValues={{ moodInput: 'i feel really good today' }}
          validationSchema={validation}
          onSubmit={handleAddingMood}
        >
          <AppFormField name="moodInput" placeholder="Type what you feel" />

          <AppSpacer size={Constants.SPACE_MEDIUM} />

          <AppFormButton label="Submit" isPrimary />
        </AppForm>
      </KeyboardAvoidingView>


      <Modal
        animationType='slide'
        visible={response?.visible}>
        <View style={styles(isDarkMode).modalContainer}>
          <AppText
            text={`It seems currently you are having a \n ${response?.response}`}
            fontSize={13}
            textStyle={styles(isDarkMode).response} />

          <View style={styles(isDarkMode).buttonContainer}>
            <TouchableOpacity style={styles(isDarkMode).primaryButton}
              onPress={() => setResponse({ ...response, visible: false })}>
              <AppText
                text="Cancel"
                fontSize={12} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
      width: 100,
      height: 100,
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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    response: {
      fontFamily: 'poppins_regular',
      textAlign: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'

    },
    cancelButton: {
      backgroundColor: Theme.darkTheme.colors.error,
      paddingVertical: Constants.SPACE_MEDIUM,
      paddingHorizontal: Constants.SPACE_LARGE,
      borderRadius: 10
    },
    primaryButton: {
      backgroundColor: Colors.primaryCore,
      paddingVertical: Constants.SPACE_MEDIUM,
      paddingHorizontal: Constants.SPACE_LARGE,
      borderRadius: 10
    },
    buttonText: {
      fontFamily: 'poppins_medium',
      color: 'white'
    }
  });

export default MoodEntry;
