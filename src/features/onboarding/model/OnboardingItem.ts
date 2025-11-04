import { SvgProps } from 'react-native-svg';

class OnboardingItem {
  image: React.FC<SvgProps>;
  title: string;
  description: string;

  constructor(image: React.FC<SvgProps>, title: string, description: string) {
    this.image = image;
    this.title = title;
    this.description = description;
  }
}

export default OnboardingItem;
