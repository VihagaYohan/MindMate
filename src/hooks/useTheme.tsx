import { useColorScheme } from 'react-native';

const useIsDarkMode = (): boolean => {
    const colorScheme = useColorScheme();
    return colorScheme === 'dark';
};

export default useIsDarkMode;