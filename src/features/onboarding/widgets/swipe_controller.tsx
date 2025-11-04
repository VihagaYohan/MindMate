import React, {useState} from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { AppText } from '../../../components'; // components
import { Colors, Constants } from '../../../shared';
import { PAGE_WIDTH } from './paginator.tsx';
import { OnboardingList } from '../data'; // shared

interface SwipeControllerProps {
  title: string;
  onPress: () => void;
  translateX: SharedValue<number>;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const SwipeController: React.FC<SwipeControllerProps> = ({
  title = 'Next',
  onPress,
  translateX,
}: SwipeControllerProps) => {
  const [isLastPage, setIsLastPage] = useState(false);

  useAnimatedReaction(() => {
    const currentPage: number = Math.round(translateX.value / PAGE_WIDTH)
    return currentPage === OnboardingList.length - 1
  },
    (result, prev) => {
    if(result !== prev) {
      runOnJS(setIsLastPage)(result);
    }
    })

  const rButtonStyle = useAnimatedStyle(() => {
    const currentPage: number = Math.round(translateX.value / PAGE_WIDTH);
    const last = currentPage === OnboardingList.length - 1;
    return {
      paddingHorizontal: withSpring(
        last ? Constants.SPACE_LARGE : Constants.SPACE_MEDIUM
      ),
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[styles.container, rButtonStyle]}
      onPress={() => onPress()}
    >
      <AppText
        text={isLastPage ? 'Get started' : title}
        fontSize={13}
        textStyle={styles.textStyle}
      />
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Constants.SPACE_SMALL,
    paddingHorizontal: Constants.SPACE_MEDIUM,
    backgroundColor: Colors.primaryCore,
    borderRadius: Constants.SPACE_LARGE,
  },
  textStyle: {
    color: Colors.neutral98,
    fontFamily: 'poppins_semibold',
  },
});

export default SwipeController;
