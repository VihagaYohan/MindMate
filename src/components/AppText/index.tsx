import { StyleSheet, Text, TextStyle, TextProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize'

// shared
import { Theme } from '../../shared'

// hooks
import { useTheme } from '../../hooks'

interface AppTextProps extends TextProps {
  text?: string;
  fontSize?: number,
  textStyle?: TextStyle;
}

const AppText = ({ text, fontSize = 12, textStyle, ...props }: AppTextProps) => {
  const isDarkTheme = useTheme()

  return (
    <Text style={[styles(isDarkTheme, fontSize).text, textStyle]} {...props}>
      {text}
    </Text>
  );
};

const styles = (isDarkTheme: boolean, fontSize: number = 12) => StyleSheet.create({
  text: {
    fontSize: RFValue(fontSize),
    color: isDarkTheme ? Theme.darkTheme.colors.text : Theme.lightTheme.colors.text
  },
});

export default AppText;
