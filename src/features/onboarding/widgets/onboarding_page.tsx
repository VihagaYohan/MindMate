import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { AppContainer, AppSpacer, AppText } from '../../../components'; // components
import { useTheme } from '../../../hooks'; // hooks
import { Colors, Constants, DeviceUtils } from '../../../shared'; // shared
import { OnboardingItem } from '../model'; // model

interface propTypes {
  item: OnboardingItem;
}

const SIZE: number = DeviceUtils.SCREEN_WIDTH - Constants.SPACE_SMALL * 2;

const OnboardingPage: React.FC<propTypes> = ({ item,}) => {
  const isDarkTheme: boolean = useTheme();
  const { image, title, description } = item;
  const Icon: React.FC<SvgProps> = image;

  return (
    <AppContainer containerStyle={styles(isDarkTheme).container}>
      <Icon width={SIZE} height={SIZE} />

      <AppSpacer size={Constants.SPACE_LARGE * 2} />

      <AppText
        text={title}
        textStyle={styles(isDarkTheme).title}
        fontSize={18}
      />

      <AppSpacer size={Constants.SPACE_SMALL} />

      <AppText
        text={description}
        textStyle={styles(isDarkTheme).description}
        fontSize={13}
      />
    </AppContainer>
  );
};

const styles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      width: SIZE,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'poppins_bold',
      textAlign: 'center',
      color: Colors.primaryCore,
    },
    description: {
      fontFamily: 'poppins_regular',
      textAlign: 'center',
      color: isDarkTheme ? Colors.neutral98 : Colors.neutral60,
    },
  });

export { SIZE };

export default OnboardingPage;
