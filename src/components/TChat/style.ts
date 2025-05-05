import {StyleSheet} from 'react-native';

import {ModerateScale} from '../../utilities/Fonts';

export const style = StyleSheet.create({
  TextInput: {
    flex: 1,
    color: 'black',
    textAlignVertical: 'top',
    fontSize: ModerateScale(14),
  },

  TextInputPlaceHolder: {
    fontSize: ModerateScale(15),
    fontWeight: '500',
  },
  MessageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  Message: {
    gap: ModerateScale(5),
    padding: ModerateScale(15),
    marginVertical: ModerateScale(5),
    maxWidth: '80%',
    borderColor: '#ECECEC',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: ModerateScale(10),
  },
  ReceivedMessage: {
    backgroundColor: 'rgb(255,249,247)',
  },
  Sent: {
    justifyContent: 'flex-end',
  },
  SentMessage: {
    backgroundColor: 'rgb(248,248,250)',
  },

  MessageText: {
    color: 'black',
    flex: 1,
    fontSize: ModerateScale(15),
  },
  Header: {
    fontSize: ModerateScale(10),
    alignSelf: 'center',
    marginVertical: 8,
  },
});
