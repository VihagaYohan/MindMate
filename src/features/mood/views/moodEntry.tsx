import React, { useCallback, useLayoutEffect, useState, useEffect } from 'react';
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
import { ErrorResponse, MoodService, CategoryService } from '../../../services';

// models
import { AddMoodRequest } from '../../../services/moods';

// navigation
import { RootStackParamList } from '../../../navigation/RootStackParamList';
import { Routes } from '../../../navigation';

// store
import { StateType, useStore } from '../../../store';
import { Mood, Category } from '../../../data/models';

type propTypes = NativeStackScreenProps<RootStackParamList, Routes>;

// validation
const validation = Yup.object().shape({
  moodInput: Yup.string().min(10).required('Mood input is required'),
});

const emojis: any[] = ['😞', '😑', '😁']

const MoodEntry = ({ navigation }: propTypes) => {
  const isDarkMode = useTheme();
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<{ visible: boolean, prediction: string }>({ visible: false, prediction: 'Normal' })
  const [categories, setCategories] = useState<Category[]>()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, []);

  useEffect(() => {
    fetchCategories()
  }, [])

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

  // fetch resource categories
  const fetchCategories = async () => {
    const categoryService = new CategoryService
    const result = await categoryService.getServices()

    const { data } = result.data
    const response = data.data

    console.log(response)

    setCategories(response)
  }
  // add mood entry
  const handleAddingMood = async (values: { moodInput: string }) => {
    setLoading(true)

    const payload = {
      level: 5,
      description: selectedIndex === 0 ? 'sad' : selectedIndex === 1 ? 'neutral' : 'happy',
      notes: values.moodInput
    }

    try {
      const moodService = new MoodService()
      const response: ServerResponse<Mood | ErrorResponse> = await moodService.addMood(payload)

      const result: Mood | ErrorResponse = response.data

      setResponse({
        visible: true,
        prediction: result?.prediction
      })

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  };

  // get category id based on prediction
  const getCategory = (prediction: string) => {
    const categoryId = categories?.map((item) => {
      if (item.title === prediction) {
        return item._id
      } return categories[0]._id
    })

    console.log('category id ' + categoryId)
    return categoryId
  }

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
          initialValues={{ moodInput: 'i have lots of work and lots of stress at the moment, i dont know how to deal with it, and there is no one for me to talk to' }}
          validationSchema={validation}
          onSubmit={handleAddingMood}
        >
          <AppFormField name="moodInput" placeholder="Type what you feel" label={''}
            multiline={true} />

          <AppSpacer size={Constants.SPACE_MEDIUM} />

          <AppFormButton label="Submit" isPrimary />
        </AppForm>
      </KeyboardAvoidingView>


      <Modal
        animationType='slide'
        visible={response?.visible}
        transparent={false}
      >
        <View style={styles(isDarkMode).modalContainer}>
          <AppText
            text={`It seems currently you are having a \n depression thoughts.`}
            fontSize={13}
            textStyle={styles(isDarkMode).response} />

          <AppSpacer
            isVertical
            size={Constants.SPACE_SMALL} />

          {response.prediction != 'Normal' && (
            <AppText
              text='Would you like to view resources'
              fontSize={11}
              textStyle={{
                fontFamily: 'poppins_medium'
              }} />
          )}

          <View style={styles(isDarkMode).buttonContainer}>
            <TouchableOpacity style={styles(isDarkMode).secondaryButton}
              onPress={() => setResponse({ ...response, visible: false })}>
              <AppText
                text="Cancel"
                fontSize={12}
                textStyle={{ fontFamily: 'poppins_medium', color: Theme.darkTheme.colors.error }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles(isDarkMode).primaryButton}
              onPress={() => {
                // hide modal
                setResponse({ ...response, visible: false })

                // navigate to resource page with respective category
                navigation.navigate(Routes.resources, {})
              }}>
              <AppText
                text="View"
                fontSize={12}
                textStyle={{ fontFamily: 'poppins_medium', color: 'white' }} />
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
      //backgroundColor: 'rgba(0, 0, 0, 0.95) '
    },
    response: {
      fontFamily: 'poppins_regular',
      textAlign: 'center'
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Constants.SPACE_MEDIUM
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
      borderRadius: 10,
      marginLeft: Constants.SPACE_MEDIUM
    },
    secondaryButton: {

    },
    buttonText: {
      fontFamily: 'poppins_medium',
      color: 'white'
    }
  });

export default MoodEntry;
