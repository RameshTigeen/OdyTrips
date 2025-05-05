import {Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const modifiedSize = dimensions.height > 800 && dimensions.width > 400 ? 2 : 0;
const Theme = {
  COLOR: {
    ORANGE: '#fa7200', // rgb(250,114,0)
    GREY_1: '#465b62', // rgb(70,91,98)
    GREY_2: '#475b63', // rgb(71,91,99)
    GREY_3: '#666666', // rgb(102,102,102)
    GREY_4: '#a1bcc0', // rgb(161,188,192)
    GREY_5: '#adadad', // rgb(173,173,173)
    GREY_6: '#cbe4e3', // rgb(203,228,227)
    GREY_7: '#f5f8f8', // rgb(245,248,248)
  },
  FONT: {
    SIZE_48: 48 + modifiedSize,
    SIZE_36: 36 + modifiedSize,
    SIZE_28: 28 + modifiedSize,
    SIZE_24: 24 + modifiedSize,
    SIZE_20: 20 + modifiedSize,
    SIZE_18: 18 + modifiedSize,
    SIZE_16: 16 + modifiedSize,
    SIZE_14: 14 + modifiedSize,
    SIZE_12: 12 + modifiedSize,
    _ROMAN: 'Avenir-Roman',
    _HEAVY: 'Avenir-Heavy',
  },
};
export default Theme;
