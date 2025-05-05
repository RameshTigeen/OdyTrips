import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackScreens = {
  setup: undefined;
  mytripshome: undefined;
  addtrip: undefined;
  tripdetails: undefined;
  briefingdetails: undefined;
  triptext: undefined;
  tripdaydetails: undefined;
  stopdetails: undefined;
  webviewer: undefined;
  imageviewer: undefined;
  pdfviewer: undefined;
  Discover: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackScreens> =
  NativeStackScreenProps<RootStackScreens, T>;
