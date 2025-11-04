import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Constants, DeviceUtils } from '../../../shared'; // shared

const SIZE: number = 15;
const PAGE_WIDTH: number = DeviceUtils.SCREEN_WIDTH - Constants.SPACE_SMALL * 2;

interface PaginatorProps {
  index: number;
  translateX: SharedValue<number>;
}

const Paginator: React.FC<PaginatorProps> = ({ index, translateX }) => {
  const activeIndex = useDerivedValue(() => {
    return Math.round(translateX.value / PAGE_WIDTH);
  });

  const rDotStyle = useAnimatedStyle(() => {
    const inputRage: number[] = [
      (index-1) * PAGE_WIDTH,
      index * PAGE_WIDTH,
      (index + 1) * PAGE_WIDTH
    ]
    const outputRange: number[] = [SIZE,SIZE  * 2,SIZE]

    const width: number = interpolate(
      translateX.value,
      inputRage,
      outputRange,
      Extrapolation.CLAMP
    )

    const isActive = activeIndex.value === index;
    return {
      backgroundColor: withTiming(
        isActive ? Colors.primaryCore : Colors.neutralVariant70,
      ),
      width: width
    };
  });

  return <Animated.View style={[styles.container, rDotStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: Constants.SPACE_LARGE,
    marginLeft: Constants.SPACE_SMALL,
    backgroundColor: Colors.neutral70,
  },
});

export {PAGE_WIDTH}

export default Paginator;
