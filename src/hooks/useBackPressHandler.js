import {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';

import {useNavigation} from '@react-navigation/native';

/**
 * Alert user wheather they want to exit the app or not, when press the back button is pressed
 */
export const useBackPressHandler = () => {
  const navigation = useNavigation();
  const backAction = () => {
    Alert.alert('Confirmation', 'Are you sure you want to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          return backAction();
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, []);
};
