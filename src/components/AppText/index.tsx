import { StyleSheet, Text, TextStyle, TextProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

// shared
import { Theme } from '../../shared'

interface AppTextProps extends TextProps {
  text: string;
  textStyle?: TextStyle;
}

const AppText = ({ text, textStyle, ...props }: AppTextProps) => {
  return (
    <Text style={[styles.text, textStyle]} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(12),
  },
});

export default AppText;
