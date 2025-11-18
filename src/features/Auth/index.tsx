import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

// share
import { Constants } from '../../shared';

// views
import { LoginPage, RegisterPage } from './views';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootStackParamList.ts';
import { Routes } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, Routes>;

const AuthPage = ({ navigation }: Props) => {
  const [login, setLogin] = useState<boolean>(false);

  const toggleForm = () => {
    setLogin(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      {login ? (
        <Animated.View
          key="login"
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
        >
          <LoginPage
            onPress={() => toggleForm()}
            onActionPress={() => {

              navigation.navigate(Routes.bottomNav, {})
            }}
          />
        </Animated.View>
      ) : (
        <Animated.View
          key="register"
          entering={FadeIn}
          exiting={FadeOut}
          layout={Layout}
        >
          <RegisterPage
            onPress={() => toggleForm()}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.SPACE_MEDIUM,
  },
});

export default AuthPage;
