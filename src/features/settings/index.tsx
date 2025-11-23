import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  Heart,
  Trash,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

// components
import { AppContainer, AppText, AppSpacer, AppButton } from '../../components';

// service
import { UserService } from '../../services';

// shared
import {
  AppAvatar,
  Colors,
  Constants,
  ErrorResponse,
  ServerResponse,
  Theme,
} from '../../shared';

// hoooks
import { useTheme } from '../../hooks';

// model
import { Profile } from '../../data/models';
import { ProfileResponse } from '../../services/user';

interface optionType {
  iconName: string;
  label: string;
  onPress: () => void;
  isLastItem?: boolean;
}

const ICON_SIZE: number = 23;

const SettingsPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const isDarkMode: boolean = useTheme();

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      setError(false);
      setLoading(true);
      const userService = new UserService();
      const result: ServerResponse<ProfileResponse | ErrorResponse> =
        await userService.currentUser();

      if (result.statusCode === 200) {
        const { data } = result.data;
        setProfile(data);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const OptionField = ({
    iconName,
    label,
    onPress,
    isLastItem = false,
  }: optionType) => {
    const iconColor = isDarkMode
      ? Theme.darkTheme.colors.text
      : Theme.lightTheme.colors.text;
    return (
      <Pressable onPress={() => onPress()}>
        <View style={styles(isDarkMode).optionContainer}>
          <View style={styles(isDarkMode).iconContainer}>
            {iconName === 'Heart' ? (
              <Heart
                size={ICON_SIZE}
                style={styles(isDarkMode).iconStyle}
                color={iconColor}
              />
            ) : iconName === 'Trash' ? (
              <Trash
                size={ICON_SIZE}
                style={styles(isDarkMode).iconStyle}
                color={iconColor}
              />
            ) : (
              <LogOut
                size={ICON_SIZE}
                style={styles(isDarkMode).iconStyle}
                color={Theme.lightTheme.colors.error}
              />
            )}

            <AppText
              text={label}
              fontSize={13}
              textStyle={styles(isDarkMode).optionLabel}
            />
          </View>

          <View style={styles(isDarkMode).buttonContainer}>
            <ChevronRight size={ICON_SIZE} color={iconColor} />
          </View>
        </View>

        {!isLastItem && <AppSpacer isVertical size={Constants.SPACE_MEDIUM} />}
      </Pressable>
    );
  };

  if (error) {
    return (
      <AppContainer isLoading={false}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <AppText text="Unable to locate profile" />
        </View>
      </AppContainer>
    );
  }

  return (
    <AppContainer isLoading={loading}>
      <View style={styles(isDarkMode).headerContainer}>
        <AppAvatar
          firstName={profile?.firstName}
          lastName={profile?.lastName}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AppText
            text={profile?.firstName
              .concat(` ${profile?.lastName}`)
              .toUpperCase()}
            textStyle={styles(isDarkMode).profileName}
            fontSize={14}
          />

          <AppText text="vihagayohan94@gmail.com" fontSize={13} />

          <AppSpacer isVertical size={Constants.SPACE_MEDIUM} />

          <AppButton
            isPrimary
            label="Edit Profile"
            onPress={() => console.log('edit profile')}
            buttonStyle={{
              borderRadius: Constants.SPACE_MEDIUM,
            }}
          />
        </View>
      </View>

      <AppSpacer isVertical size={Constants.SPACE_LARGE} />

      <OptionField
        iconName="Heart"
        label="Favorites"
        onPress={() => console.log('')}
      />
      <OptionField
        iconName="Trash"
        label="Clear cache"
        onPress={() => console.log('')}
      />
      <OptionField
        iconName="LogOut"
        label="Log out"
        onPress={() => console.log('')}
        isLastItem
      />
    </AppContainer>
  );
};

const styles = (isDarkMode: boolean) =>
  StyleSheet.create({
    headerContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    profileName: {
      fontFamily: 'poppins_semibold',
    },
    fieldLabel: {
      fontFamily: 'poppins_semibold',
      marginLeft: Constants.SPACE_SMALL,
    },
    fieldValueContainer: {
      borderWidth: 1,
      borderRadius: 5,
      padding: Constants.SPACE_SMALL,
      backgroundColor: isDarkMode
        ? Theme.darkTheme.colors.background
        : Colors.neutral95,
      borderColor: isDarkMode
        ? Theme.darkTheme.colors.background
        : Colors.neutral90,
    },
    fieldValue: {
      fontFamily: 'poppins_regular',
    },
    optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    iconContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconStyle: {
      marginRight: Constants.SPACE_MEDIUM,
    },
    optionLabel: {
      fontFamily: 'poppins_regular',
    },
    buttonContainer: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SettingsPage;
