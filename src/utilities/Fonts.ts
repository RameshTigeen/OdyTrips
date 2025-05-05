import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const HorizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const VerticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const isPortrait = height > width;

export const ModerateScale = (size: number, factor = 0.3) => {
  if (isPortrait) {
    return size + (HorizontalScale(size) - size) * factor;
  } else {
    return size + (VerticalScale(size) - size) * factor;
  }
};
