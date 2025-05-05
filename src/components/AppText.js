import React, {useContext} from 'react';
import {Text} from 'react-native';

import Theme from '../utilities/Theme';

import {AppContext} from '../context/AppContextProvider';

/**
 * App text wrapper
 * @param {String} children Text to be displayed
 * @param {String} family Font family
 * @param {Number} size Size of the text
 * @param {Array} customStyle Style provided the stylesheet
 * @param {String} varient "primary" or "secondary"
 * @returns
 */
export default function AppText({
  size,
  family,
  style,
  varient,
  children,
  customStyle,
  ...other
}) {
  const {cs} = useContext(AppContext);
  /*
    The client of this app might send the ' ' character inside the string
    It seems like space but it is not.
    It is a Unicode Character “ ” (U+00A0) also called No-Break Space (NBSP)
    Which make the text wrap not possible.
    For more reference Visit: https://www.compart.com/en/unicode/U+00A0
  */
  const modChildren =
    typeof children === 'string'
      ? children.replace(/ |&nbsp;/g, ' ')
      : children; // Replacing (NBSP) with Empty space
  return (
    <Text
      style={[
        cs([
          `f-f-${family}`,
          `f-size-${size}`,
          `app-${varient === 'primary' ? 'p' : 's'}text-color`,
        ]),
        cs(customStyle),
        {lineHeight: 22},
        style,
      ]}
      {...other}>
      {modChildren}
    </Text>
  );
}

AppText.defaultProps = {
  children: '',
  customStyle: [],
  family: Theme.FONT._ROMAN,
  size: Theme.FONT.SIZE_14,
  varient: 'secondary',
};
