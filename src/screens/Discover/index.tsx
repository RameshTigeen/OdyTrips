import React from 'react';
import {Text, View} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TChat from '../../components/TChat';
import AppView from '../../components/AppView';
import MyTripsHeader from '../../components/MyTripsHeader';

import Theme from '../../utilities/Theme';
import {ModerateScale} from '../../utilities/Fonts';

import type {RootStackScreenProps} from '../../routes/type';
import type {MessageProps, UserProps} from '../../components/TChat/type';

export type DiscoverState = {
  messageList: MessageProps[];
};

const AppUserIdentify: UserProps = {
  _id: 1,
  image: '',
};

const defaultMessageList: MessageProps[] = [
  {
    _id: 2,
    text: 'On a Saturday, the Wakefield Hotel is open till 10.30pm, during March',
    createdAt: new Date(),
    user: null,
    audio: '',
  },
  {
    _id: 1,
    text: 'What time does the wakefield Hotel close on a Saturday',
    createdAt: new Date(),
    user: AppUserIdentify,
    audio: 'Message',
  },
];

export default function Discover({
  navigation,
}: RootStackScreenProps<'Discover'>) {
  const insets = useSafeAreaInsets();
  const [state, setState] = React.useState<DiscoverState>({
    messageList: defaultMessageList,
  });

  return (
    <AppView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <MyTripsHeader
          title={'Discover - ask Ai'}
          goBack
          page="Discover"
          onGoBack={() => {
            navigation.goBack();
          }}
        />
        <Text
          numberOfLines={2}
          style={{
            textAlign: 'right',
            paddingHorizontal: ModerateScale(50),
            paddingVertical: ModerateScale(15),
          }}>
          Type any questions you would like, or click the voice icon to 'speak'
          your quetion...
        </Text>
        <TChat
          user={AppUserIdentify}
          data={state.messageList}
          HandleSendMessage={function ({text, audio}): void {
            setState(prev => ({
              ...prev,
              audioMessage: audio,
              message: text,
              messageList: [
                {
                  _id: prev.messageList.length,
                  text: text,
                  audio: audio,
                  createdAt: new Date(),
                  user: AppUserIdentify,
                },
                ...prev.messageList,
              ],
            }));
          }}
          HandleLoadMore={function (): void {}}
          HandleRefresh={function (): void {}}
          loading={false}
          loadingMore={false}
        />
      </View>
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: Theme.COLOR.GREY_1,
        }}
      />
    </AppView>
  );
}
