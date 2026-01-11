import React from 'react';
import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native';
import { ChevronDown, LucideFilter } from 'lucide-react-native';
import {Calendar} from 'react-native-calendars'

// components
import { AppText } from '../../../components';

// shared
import { Colors, Constants } from '../../../shared';

// hooks
import { useTheme } from '../../../hooks';

const PeriodPicker = () => {
  const isDarkMode = useTheme();

  return (
     <Pressable>
       <LucideFilter/>
     </Pressable>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 2,
      borderColor: Colors.primaryCore,
      paddingVertical: Constants.SPACE_SMALL,
      paddingHorizontal: Constants.SPACE_MEDIUM,
      borderRadius: Constants.SPACE_LARGE,
    },
    title: {
      fontFamily: 'poppins_medium',
    },
  });

export default PeriodPicker;
